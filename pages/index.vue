<template>
  <div class="page">
    <ul class="link-list">
      <li v-for="menu in menus" :key="menu.pid" class="link-item">
        <nuxt-link :to="menu.pid">
          {{ menu.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { menus } from '../lib/constants'

export default {
  computed: {
    menus () {
      return menus
    }
  }
}
</script>

<style scoped>
.page {
  background: #eef;
}
</style>
