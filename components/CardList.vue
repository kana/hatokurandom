<template>
  <div>
    <ul class="card-list">
      <li v-for="card in cards" :key="card.cid" class="card-item">
        {{ card.name }}
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
      cids: cidsFromPid(this.pid)
    }
  },
  computed: {
    cards () {
      return this.cids.map(cardFromCid)
    },
    special () {
      return parseSpecialPid(this.pid)
    }
  },
  methods: {
    shuffle () {
      this.cids = cidsFromPid(this.pid)
    }
  }
}
</script>

<style scoped>
</style>
