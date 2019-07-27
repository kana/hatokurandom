<template>
  <ul class="link-list">
    <li v-for="pid in pids" :key="pid" class="link-item">
      <nuxt-link :to="pid">
        {{ titleFromPid(pid) }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import { titleFromPid } from '~/lib/constants'

export default {
  name: 'PageList',
  props: {
    pids: {
      type: Array, // string[]
      default: () => []
    }
  },
  methods: {
    titleFromPid
  }
}
</script>

<style scoped>
</style>
