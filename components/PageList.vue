<template>
  <ul class="link-list">
    <li v-for="childPid in childPids" :key="childPid" class="link-item">
      <nuxt-link :to="childPid">
        {{ titleFromPid(childPid) }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import { childPidsFromPid, titleFromPid } from '~/lib/constants'

export default {
  name: 'PageList',
  props: {
    pid: {
      type: String,
      required: true
    }
  },
  computed: {
    childPids () {
      return childPidsFromPid(this.pid)
    }
  },
  methods: {
    titleFromPid
  }
}
</script>

<style scoped>
</style>
