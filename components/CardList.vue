<template>
  <div class="container">
    <div>
      Debug:

      <button @click="debugRandomSampling">
        Shuffle 100,000 times
      </button>

      <div>{{ debugStatus }}</div>

      <div v-for="(count, name) in debugStats" :key="name">
        {{ count }} {{ name }}
      </div>
    </div>
    <block-title v-if="special.editable || sortedXcardsExcluded.length > 0">
      使用するカード
    </block-title>
    <omni-list>
      <transition-group :key="shuffleCount" name="height" tag="div">
        <card-list-item
          v-for="xcard in sortedXcardsIncluded"
          :key="xcard.cid"
          :editable="special.editable"
          :random="special.random"
          :xcard="xcard"
          @change-this-card="onChangeThisCard(xcard)"
        />
        <omni-list-item v-if="sortedXcardsIncluded.length === 0" key="divider" class="divider">
          カードを選んでください。
        </omni-list-item>
      </transition-group>
    </omni-list>

    <template v-if="sortedXcardsExcluded.length > 0">
      <block-title>
        {{ special.random ? '除外したカード' : '未使用のカード' }}
      </block-title>
      <omni-list>
        <transition-group name="height" tag="div">
          <card-list-item v-for="xcard in sortedXcardsExcluded" :key="xcard.cid" :editable="special.editable" :xcard="xcard" />
        </transition-group>
      </omni-list>
    </template>

    <fade-in-out>
      <shuffle-button v-if="!leaving && special.random" class="shuffle-button" @click="shuffle" />
    </fade-in-out>

    <fade-in-out>
      <div v-if="!leaving && special.editable && !playable" class="playable-status">
        <div class="message">
          {{ playableStatusMessage }}
        </div>
      </div>
    </fade-in-out>
  </div>
</template>

<script>
import BlockTitle from '~/components/BlockTitle'
import CardListItem from '~/components/CardListItem'
import FadeInOut from '~/components/FadeInOut'
import OmniList from '~/components/OmniList'
import OmniListItem from '~/components/OmniListItem'
import ShuffleButton from '~/components/ShuffleButton'
import EventBus from '~/lib/eventbus'
import { isPredefinedSupplyPid, parseSpecialPid, rsidFromXcards, sortXcards, xcardsFromPid, xcardsAndMetaFromRsid } from '~/lib/utils'

export default {
  name: 'CardList',
  components: {
    BlockTitle,
    CardListItem,
    FadeInOut,
    OmniList,
    OmniListItem,
    ShuffleButton
  },
  props: {
    pid: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      debugStats: {},
      debugStatus: 'initial',
      leaving: false,
      shuffleCount: 0,
      xcards: this.$route.query.rsid
        ? xcardsAndMetaFromRsid(this.$route.query.rsid).xcards
        : this.rechooseXcards()
    }
  },
  computed: {
    playable () {
      return this.sortedXcardsIncluded.length === 10
    },
    playableStatusMessage () {
      const lackedCount = 10 - this.sortedXcardsIncluded.length
      if (lackedCount > 0) {
        return `あと${lackedCount}種類のカードを選んでください。`
      }

      if (lackedCount < 0) {
        return `あと${-lackedCount}種類のカードを除外してください。`
      }

      return ''
    },
    sharable () {
      return this.playable || this.pid.startsWith('reference:')
    },
    sharePid () {
      if (this.sharable) {
        if (isPredefinedSupplyPid(this.pid)) {
          return this.pid
        } else {
          const xcards = this.special.random
            ? this.xcards
            : this.xcards.filter(xcard => !xcard.dropped)
          return `supply:${rsidFromXcards(xcards, this.special.editor)}`
        }
      } else {
        return null
      }
    },
    sortedXcards () {
      return sortXcards(this.xcards)
    },
    sortedXcardsExcluded () {
      return this.sortedXcards.filter(xcard => xcard.dropped)
    },
    sortedXcardsIncluded () {
      return this.sortedXcards.filter(xcard => !xcard.dropped)
    },
    special () {
      return parseSpecialPid(this.pid)
    }
  },
  watch: {
    pid () {
      this.onUpdateXcards()
    },
    xcards: {
      handler () {
        this.onUpdateXcards()
      },
      deep: true
    }
  },
  mounted () {
    this.onUpdateXcards()

    // To smoothly fade out shuffle-button and playable-status.
    EventBus.$once('leaving-from-randomizer-page', () => {
      this.leaving = true
    })
  },
  methods: {
    onChangeThisCard (changedXcard) {
      this.xcards = this.rechooseXcards(changedXcard)
      this.$ga.event({
        eventCategory: 'supply',
        eventAction: 'change-this-card',
        eventLabel: changedXcard.name
      })
    },
    onUpdateXcards () {
      this.$store.commit('supply/setPid', this.sharePid)

      if (this.special.random) {
        this.$router.replace({
          path: this.$route.path,
          query: {
            rsid: rsidFromXcards(this.xcards, this.special.editor)
          }
        })
      }
    },
    rechooseXcards (changedXcard) {
      const options =
        changedXcard
          ? {
            ...this.$store.state.options,
            changedXcard,
            mustXcards: this.xcards.filter(xcard => xcard.cid !== changedXcard.cid)
          }
          : this.$store.state.options
      return xcardsFromPid(this.pid, options)
    },
    shuffle () {
      this.shuffleCount++ // Disable a massive transition for each shuffle.
      this.xcards = this.rechooseXcards()
      this.$ga.event({
        eventCategory: 'supply',
        eventAction: 'shuffle'
      })
    },
    debugRandomSampling () {
      const start = Date.now()
      this.debugStatus = 'sampling...'
      setTimeout(() => {
        for (let i = 0; i < 10 * 10000; i++) {
          const xcards = this.rechooseXcards()
          for (const xcard of xcards) {
            this.debugStats[xcard.name] = (this.debugStats[xcard.name] || 0) + 1
          }
        }
        this.debugStats = { ...this.debugStats }
        const end = Date.now()
        this.debugStatus = `done, ${end - start}`
      }, 10)
    }
  }
}
</script>

<style scoped>

.container {
  margin-bottom: calc(1ex + 2.0em + 1ex + 3.5em + 1ex);
}

.divider {
  color: var(--item-value-color);
}

.shuffle-button {
  bottom: var(--bottom-pane-height);
  position: fixed;
  right: 0;
  z-index: 2;
}

.playable-status {
  bottom: var(--bottom-pane-height);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  left: 0;
  margin-bottom: calc(1ex + 3.5em + 1ex);
  padding: 0 1em;
  position: fixed;
  width: 100%;
  z-index: 1;
}

.playable-status .message {
  background: var(--toast-background-color);
  border-radius: 1ex;
  box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 1px;
  color: var(--toast-text-color);
  font-size: 80%;
  padding: 0.5em 1.2em;
  width: 100%;
}

@media (min-width: 414px) {
  .playable-status {
    margin-bottom: 1.2em;
  }

  .playable-status .message {
    width: auto;
  }
}

.height-enter-active,
.height-leave-active {
  overflow: hidden;
  transition: max-height 0.4s, padding 0.4s;
}

.height-enter,
.height-leave-to {
  max-height: 0;
  padding-bottom: 0;
  padding-top: 0;
}
.height-enter-to,
.height-leave {
  max-height: 2.1em;
}

</style>
