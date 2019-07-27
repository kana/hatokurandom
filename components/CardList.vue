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
  </div>
</template>

<script>
import { sortBy } from 'lodash-es'
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
    sortedXcards () {
      return sortBy(this.xcards, [
        'dropped',
        'eid',
        'cost',
        'link',
        'name',
        'cid'
      ])
    },
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
