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

    <div v-if="special.random" class="shuffle-button">
      <div class="icon" @click="shuffle">
        <font-awesome-icon icon="sync-alt" size="lg" />
      </div>
    </div>

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
import { isPredefinedSupplyPid, parseSpecialPid, rsidFromXcards, sortXcards, xcardsFromPid, xcardsFromRsid } from '~/lib/constants'

export default {
  name: 'CardList',
  components: {
    BlockTitle,
    CardListItem,
    OmniList,
    OmniListItem
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
  margin-bottom: 3em;
  margin-top: 2em;
}

.divider {
  color: var(--item-value-color);
}

.shuffle-button {
  align-items: center;
  background: var(--link-text-color);
  border-radius: 3.5em;
  bottom: var(--bottom-pane-height);
  color: var(--switch-knob-color);
  cursor: pointer;
  display: flex;
  height: 3.5em;
  justify-content: center;
  margin-bottom: 1ex;
  margin-right: 1ex;
  position: fixed;
  right: 0;
  width: 3.5em;
  z-index: 1;
}

.shuffle-button .icon {
  align-items: center;
  border-radius: 3.5em;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  transition: background 0.2s;
  width: 100%;
}

.shuffle-button .icon:hover {
  background: rgba(255, 255, 255, 0.2);
}

.playable-status {
  bottom: var(--bottom-pane-height);
  display: flex;
  justify-content: center;
  left: 0;
  margin-bottom: 1ex;
  position: fixed;
  width: 100%;
  z-index: 1;
}

.playable-status .message {
  background: var(--toast-background-color);
  color: var(--toast-text-color);
  border-radius: 1ex;
  font-size: 80%;
  padding: 0.5em 1.2em;
}

</style>
