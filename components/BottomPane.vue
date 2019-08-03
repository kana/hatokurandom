<template>
  <div class="bottom-pane">
    <nuxt-link
      v-for="tab in tabs"
      :key="tab.path"
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
      return this.$route.path.startsWith('/preferences') ? '/preferences' : '/'
    },
    tabs () {
      const homeTabPath = this.$route.path.startsWith('/preferences')
        ? this.$store.state.history.homeTabLastPath
        : '/'
      const preferencesTabPath = this.$route.path.startsWith('/preferences')
        ? '/preferences'
        : this.$store.state.history.preferencesTabLastPath
      return [
        { path: homeTabPath, icon: 'home' },
        { path: preferencesTabPath, icon: 'cog' }
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
  transition: background 0.2s, color 0.2s;
  width: 100%;
}

.tab.active {
  color: var(--item-active-background-color);
}

@media (hover) {
  .tab:hover {
    background: #f2f2f4;
  }
}

.tab + .tab {
  border-left: 1px solid #a7a7ab;
}

</style>
