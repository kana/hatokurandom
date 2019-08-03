<template>
  <div class="container">
    <block-title v-if="special.editable || sortedXcardsExcluded.length > 0">
      使用するカード
    </block-title>
    <omni-list>
      <card-list-item v-for="xcard in sortedXcardsIncluded" :key="xcard.cid" :editable="special.editable" :xcard="xcard" />
      <omni-list-item v-if="sortedXcardsIncluded.length === 0" class="divider">
        カードを選んでください。
      </omni-list-item>
    </omni-list>

    <template v-if="sortedXcardsExcluded.length > 0">
      <block-title>
        {{ special.random ? '除外したカード' : '未使用のカード' }}
      </block-title>
      <omni-list>
        <card-list-item v-for="xcard in sortedXcardsExcluded" :key="xcard.cid" :editable="special.editable" :xcard="xcard" />
      </omni-list>
    </template>

    <shuffle-button v-if="special.random" class="shuffle-button" @click="shuffle" />

    <div v-if="special.editable && !playable" class="playable-status">
      <div class="message">
        {{ playableStatusMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import BlockTitle from '~/components/BlockTitle'
import CardListItem from '~/components/CardListItem'
import OmniList from '~/components/OmniList'
import OmniListItem from '~/components/OmniListItem'
import ShuffleButton from '~/components/ShuffleButton'
import { isPredefinedSupplyPid, parseSpecialPid, rsidFromXcards, sortXcards, xcardsFromPid, xcardsFromRsid } from '~/lib/constants'

export default {
  name: 'CardList',
  components: {
    BlockTitle,
    CardListItem,
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
      xcards: this.$route.query.rsid
        ? xcardsFromRsid(this.$route.query.rsid)
        : xcardsFromPid(this.pid, this.$store.state.options)
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
          return `supply:${rsidFromXcards(xcards)}`
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
  },
  methods: {
    onUpdateXcards () {
      this.$store.commit('supply/setPid', this.sharePid)

      if (this.special.random) {
        this.$router.replace({
          path: this.$route.path,
          query: {
            rsid: rsidFromXcards(this.xcards)
          }
        })
      }
    },
    shuffle () {
      this.xcards = xcardsFromPid(this.pid, this.$store.state.options)
    }
  }
}
</script>

<style scoped>

.container {
  margin-bottom: calc(1ex + 2.0em + 1ex + 3.5em + 1ex);
  margin-top: 2em;
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

</style>
