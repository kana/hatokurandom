<template>
  <div>
    <ul class="card-list">
      <li v-for="xcard in sortedXcards" :key="xcard.cid" class="card-item">
        <label>
          <input v-if="special.editable" v-model="xcard.dropped" type="checkbox">
          {{ xcard.name }}
        </label>
      </li>
    </ul>
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

.card-list > .card-item:nth-child(10) {
  border-bottom: 1em solid #999;
}

</style>
