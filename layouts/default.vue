<template>
  <div
    v-touch:swipe.right="onSwipeRight"
    class="app"
    @touchmove="onTouchMove"
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
import { pidFromPath } from '~/lib/utils'

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
      const backPath = this.$store.getters['history/backPath'](this.pid)
      if (backPath) {
        return backPath
      }
      if (this.pid.startsWith('preferences')) {
        return '/'
      }
      return undefined
    }
  },
  methods: {
    isTouchStartedInGestureableArea (e) {
      const screenLeftEdgeWidth = window.innerWidth * 20 / 100
      return e.currentTarget.$$touchObj.startX < screenLeftEdgeWidth
    },
    // Back-to-parent-view gesture support.
    onSwipeRight (_right, e) {
      if (!this.isTouchStartedInGestureableArea(e)) {
        return
      }

      if (!this.toBack) {
        return
      }

      this.$router.push(this.toBack)
    },
    // Prevent vertical scroll if user seesm to be doing a gesture.
    // This handler must be bound by @touchmove instead of v-touch:moved,
    // because the latter is passive so e.preventDefault() does nothing.
    onTouchMove (e) {
      if (!this.isTouchStartedInGestureableArea(e)) {
        return
      }

      const t = e.currentTarget.$$touchObj
      const dx = t.currentX - t.startX
      const dy = t.currentY - t.startY
      if (Math.abs(dx) < Math.abs(dy) * 2) {
        return
      }

      e.preventDefault()
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
  position: relative; /* for .page-forward-enter and .page-backward-enter */
}

.bottom-pane {
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 1;
}

</style>
