<template>
  <div class="page">
    <ul class="link-list">
      <li v-for="pid in childPidList" :key="pid" class="link-item">
        <nuxt-link :to="pid">
          {{ pid }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { childPidListFromPid } from '../lib/constants'

export default {
  computed: {
    childPidList () {
      return childPidListFromPid('home')
    }
  }
}
</script>

<style scoped>
.page {
  background: #eef;
}
</style>
