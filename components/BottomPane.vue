<template>
  <div class="bottom-pane">
    <nuxt-link
      v-for="tab in tabs"
      :key="tab.pid"
      :to="tab.path"
      :class="{ active: tab.path === currentTabPath }"
      class="tab"
    >
      <font-awesome-icon size="lg" :icon="tab.icon" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'BottomPane',
  computed: {
    currentTabPath () {
      return this.$route.path === '/configure' ? '/configure' : '/'
    },
    tabs () {
      return [
        { path: '/', icon: 'home' },
        { path: '/configure', icon: 'cog' }
      ]
    }
  }
}
</script>

<style scoped>

.bottom-pane {
  align-items: center;
  background: #f5f5f7;
  border-top: 1px solid #a7a7ab;
  display: flex;
  height: var(--bottom-pane-height);
  justify-content: center;
}

.tab {
  align-items: center;
  color: var(--item-label-color);
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}

.tab.active {
  font-weight: bolder;
}

.tab:hover {
  background: #f2f2f4;
}

.tab + .tab {
  border-left: 1px solid #a7a7ab;
}

</style>
