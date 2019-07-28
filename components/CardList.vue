<template>
  <div class="container">
    <div v-if="special.editable || sortedXcardsExcluded.length > 0" class="block-title">
      使用するカード
    </div>
    <omni-list>
      <card-list-item v-for="xcard in sortedXcardsIncluded" :key="xcard.cid" :editable="special.editable" :xcard="xcard" />
      <omni-list-item
        v-if="sortedXcardsIncluded.length === 0"
        :props="{ is: 'div' }"
        class="divider"
      >
        カードを選んでください。
      </omni-list-item>
    </omni-list>

    <template v-if="sortedXcardsExcluded.length > 0">
      <div class="block-title">
        {{ special.random ? '除外したカード' : '未使用のカード' }}
      </div>
      <omni-list>
        <card-list-item v-for="xcard in sortedXcardsExcluded" :key="xcard.cid" :editable="special.editable" :xcard="xcard" />
      </omni-list>
    </template>

    <div v-if="special.random" class="shuffle-button" @click="shuffle">
      <div class="icon">
        ^v
      </div>
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
import OmniList from '~/components/OmniList'
import OmniListItem from '~/components/OmniListItem'
import { isPredefinedSupplyPid, parseSpecialPid, rsidFromXcards, sortXcards, xcardsFromPid } from '~/lib/constants'

export default {
  name: 'CardList',
  components: {
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

.container {
  margin-bottom: calc(1ex + 0.5ex + 1em + 0.5ex + 1ex);
}

.shuffle-button {
  align-items: center;
  background: #77f;
  border-radius: 3.5em;
  bottom: var(--bottom-pane-height);
  color: #fff;
  cursor: pointer;
  display: flex;
  height: 3.5em;
  justify-content: center;
  margin-bottom: 1ex;
  margin-right: 1ex;
  position: fixed;
  right: 0;
  transition: background 0.2s;
  width: 3.5em;
  z-index: 1;
}

.shuffle-button:hover {
  background: #88f;
}

.shuffle-button .icon {
  font-size: 120%;
  font-weight: bolder;
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
  background: #777;
  color: #eee;
  border-radius: 1ex;
  font-size: 80%;
  padding: 0.5ex 1em;
}

</style>
