<template>
  <div>
    <ul class="card-list">
      <li v-for="card in cards" :key="card.cid" class="card-item">
        {{ card.name }}
      </li>
    </ul>
    <div v-if="special.random">
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
  computed: {
    cards () {
      return this.cids.map(cardFromCid)
    },
    cids () {
      return cidsFromPid(this.pid)
    },
    special () {
      return parseSpecialPid(this.pid)
    }
  }
}
</script>

<style scoped>
</style>
