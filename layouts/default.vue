<template>
  <div
    v-touch:swipe.right="onSwipeRight"
    class="app"
  >
    <top-pane class="top-pane" />
    <div class="main-pane">
      <nuxt />
    </div>
    <bottom-pane class="bottom-pane" />
  </div>
</template>

<script>
import BottomPane from '~/components/BottomPane'
import TopPane from '~/components/TopPane'
import { pathFromPid, parentPidFromPid, pidFromPath } from '~/lib/utils'

export default {
  components: {
    BottomPane,
    TopPane
  },
  computed: {
    pid () {
      return pidFromPath(this.$route.path)
    },
    toBack () {
      if (this.toParent) {
        return this.toParent
      }
      if (this.pid.startsWith('preferences')) {
        return '/'
      }
      return undefined
    },
    toParent () {
      const parentPid = parentPidFromPid(this.pid)
      return parentPid !== undefined ? pathFromPid(parentPid) : undefined
    }
  },
  methods: {
    // Back-to-parent-view gesture support.
    onSwipeRight (e) {
      const screenLeftEdgeWidth = window.innerWidth * 20 / 100
      if (e.currentTarget.$$touchObj.startX < screenLeftEdgeWidth) {
        if (this.toBack) {
          this.$router.push(this.toBack)
        }
      }
    }
  }
}
</script>

<style scoped>

.app {
  width: 100%;
  height: 100vh;
  position: relative;
}

.top-pane {
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

.main-pane {
  padding: var(--top-pane-height) 0 var(--bottom-pane-height);
  position: relative;
}

.bottom-pane {
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 1;
}

</style>
