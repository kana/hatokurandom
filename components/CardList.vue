<template>
  <div>
    <div v-if="special.editable || sortedXcardsExcluded.length > 0" class="block-title">
      使用するカード
    </div>
    <ul class="card-list">
      <li v-for="xcard in sortedXcardsIncluded" :key="xcard.cid" class="card-item">
        <label class="label">
          <input v-if="special.editable" v-show="false" v-model="xcard.dropped" type="checkbox">
          {{ xcard.name }}
        </label>
      </li>
      <li v-if="sortedXcardsIncluded.length === 0" class="divider">
        カードを選んでください。
      </li>
    </ul>

    <template v-if="sortedXcardsExcluded.length > 0">
      <div class="block-title">
        {{ special.random ? '除外したカード' : '未使用のカード' }}
      </div>
      <ul class="card-list">
        <li v-for="xcard in sortedXcardsExcluded" :key="xcard.cid" class="card-item">
          <label class="label">
            <input v-if="special.editable" v-show="false" v-model="xcard.dropped" type="checkbox">
            {{ xcard.name }}
          </label>
        </li>
      </ul>
    </template>

    <div v-if="special.random" @click="shuffle">
      [Shuffle]
    </div>
    <div>
      [{{ playable ? 'OK' : '...' }}]
    </div>
  </div>
</template>

<script>
import { isPredefinedSupplyPid, parseSpecialPid, rsidFromXcards, sortXcards, xcardsFromPid } from '~/lib/constants'

export default {
  name: 'CardList',
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
      return this.xcards.filter(xcard => !xcard.dropped).length === 10
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

.label {
  cursor: pointer;
  width: 100%;
}

</style>
