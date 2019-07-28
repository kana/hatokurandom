<template>
  <div class="bottom-pane">
    <nuxt-link
      v-for="tab in tabs"
      :key="tab.pid"
      :to="tab.path"
      :class="{ active: tab.path === currentTabPath }"
      class="tab"
    >
      {{ tab.name }}
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
        { path: '/', name: '[Home]' },
        { path: '/configure', name: '[Preferences]' }
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
