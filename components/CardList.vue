<template>
  <ul class="card-list">
    <li v-for="card in cards" :key="card.cid" class="card-item">
      {{ card.name }}
    </li>
  </ul>
</template>

<script>
import { cardFromCid } from '~/lib/constants'

export default {
  name: 'CardList',
  props: {
    cids: {
      type: Array, // string[]
      default: () => []
    }
  },
  computed: {
    cards () {
      return this.cids.map(cardFromCid)
    }
  }
}
</script>

<style scoped>
</style>
