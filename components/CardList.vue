<template>
  <ul v-if="cids" class="card-list">
    <li v-for="card in cards" :key="card.cid" class="card-item">
      {{ card.name }}
    </li>
  </ul>
</template>

<script>
import { cardFromCid, cidsFromPid } from '~/lib/constants'

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
    }
  }
}
</script>

<style scoped>
</style>
