<template>
  <div class="card-list">
    <div v-if="special.editable || sortedXcardsExcluded.length > 0" class="block-title">
      使用するカード
    </div>
    <ul class="card-list">
      <card-list-item v-for="xcard in sortedXcardsIncluded" :key="xcard.cid" :editable="special.editable" :xcard="xcard" />
      <li v-if="sortedXcardsIncluded.length === 0" class="divider">
        カードを選んでください。
      </li>
    </ul>

    <template v-if="sortedXcardsExcluded.length > 0">
      <div class="block-title">
        {{ special.random ? '除外したカード' : '未使用のカード' }}
      </div>
      <ul class="card-list">
        <card-list-item v-for="xcard in sortedXcardsExcluded" :key="xcard.cid" :editable="special.editable" :xcard="xcard" />
      </ul>
    </template>

    <div v-if="special.random" @click="shuffle">
      [Shuffle]
    </div>
    <div v-if="!playable" class="playable-status">
      <div class="message">
        {{ playableStatusMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import CardListItem from '~/components/CardListItem'
import { isPredefinedSupplyPid, parseSpecialPid, rsidFromXcards, sortXcards, xcardsFromPid } from '~/lib/constants'

export default {
  name: 'CardList',
  components: {
    CardListItem
  },
  props: {
    pid: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      xcards: xcardsFromPid(this.pid)
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
    sharePid () {
      if (this.playable) {
        if (isPredefinedSupplyPid(this.pid)) {
          return this.pid
        } else {
          return `supply:${rsidFromXcards(this.xcards)}`
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
      this.updateSharePid()
    },
    xcards: {
      handler () {
        this.updateSharePid()
      },
      deep: true
    }
  },
  mounted () {
    this.updateSharePid()
  },
  methods: {
    shuffle () {
      this.xcards = xcardsFromPid(this.pid)
    },
    updateSharePid () {
      this.$store.commit('supply/setPid', this.sharePid)
    }
  }
}
</script>

<style scoped>

.playable-status {
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  margin-bottom: calc(1ex + var(--bottom-pane-height));
  position: fixed;
  width: 100%;
  z-index: 1;
}

.playable-status .message {
  background: #777;
  color: #eee;
  border-radius: 1ex;
  font-size: 80%;
  padding: 0.5ex 1em;
}

</style>
