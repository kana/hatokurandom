<template>
  <div>
    <ul class="card-list">
      <li v-for="xcard in xcards" :key="xcard.cid" class="card-item">
        <template v-if="special.editable">
          [{{ xcard.dropped ? 'x' : ' ' }}]
        </template>
        {{ xcard.name }}
      </li>
    </ul>
    <div v-if="special.random" @click="shuffle">
      [Shuffle]
    </div>
  </div>
</template>

<script>
import { cardFromCid, cidsFromPid, parseSpecialPid } from '~/lib/constants'

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
      xcards: this.xcardsFromPid(this.pid)
    }
  },
  computed: {
    special () {
      return parseSpecialPid(this.pid)
    }
  },
  methods: {
    shuffle () {
      this.xcards = this.xcardsFromPid(this.pid)
    },
    xcardsFromPid (pid) {
      return cidsFromPid(pid).map(cid => ({
        dropped: false,
        ...cardFromCid(cid)
      }))
    }
  }
}
</script>

<style scoped>
</style>
