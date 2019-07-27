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
export default {
  computed: {
    menus () {
      return [
        { pid: 'basic', name: '推奨サプライ(基本セット)' },
        { pid: 'fareast', name: '推奨サプライ(極東辺境領)' },
        { pid: 'northern', name: '推奨サプライ(北限の魔女)' }
      ]
    }
  }
}
</script>

<style scoped>
.page {
  background: #eef;
}
</style>
