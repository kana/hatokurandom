<template>
  <div class="bottom-pane">
    <transitioned-link
      v-for="tab in tabs"
      :key="tab.path"
      :path="tab.path"
      :class="{ active: tab.path === currentTabPath }"
      class="tab"
    >
      <font-awesome-icon size="lg" :icon="tab.icon" />
    </transitioned-link>
  </div>
</template>

<script>
import TransitionedLink from '~/components/TransitionedLink'
import { isPreferencesTabPid, pidFromPath } from '~/lib/utils'

export default {
  name: 'BottomPane',
  components: {
    TransitionedLink
  },
  computed: {
    currentTabPath () {
      return isPreferencesTabPid(pidFromPath(this.$route.path)) ? '/preferences' : '/'
    },
    tabs () {
      const homeTabPath = isPreferencesTabPid(pidFromPath(this.$route.path))
        ? this.$store.getters['history/homeTabLastPath']
        : '/'
      const preferencesTabPath = isPreferencesTabPid(pidFromPath(this.$route.path))
        ? '/preferences'
        : this.$store.getters['history/preferencesTabLastPath']
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
