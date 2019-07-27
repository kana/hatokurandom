<template>
  <div class="page">
    <ul class="link-list">
      <li v-for="menu in menus" :key="menu.pid" class="link-item">
        <nuxt-link :to="menu.pid">
          {{ menu.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { childPidsFromPid, titleFromPid } from '../lib/constants'

export default {
  validate ({ params }) {
    return childPidsFromPid(params.pid) !== undefined
  },
  computed: {
    menus () {
      return childPidsFromPid(this.$route.params.pid).map(pid => ({
        pid,
        title: titleFromPid(pid)
      }))
    }
  }
}
</script>

<style scoped>
.page {
  background: #eef;
}
</style>
