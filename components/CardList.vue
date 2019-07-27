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
import { xcardsFromPid, parseSpecialPid } from '~/lib/constants'

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
    special () {
      return parseSpecialPid(this.pid)
    }
  },
  methods: {
    shuffle () {
      this.xcards = xcardsFromPid(this.pid)
    }
  }
}
</script>

<style scoped>
</style>
