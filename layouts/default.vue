<template>
  <div class="app">
    <top-pane class="top-pane" />
    <div
      v-touch:start="onTouchStart"
      v-touch:swipe.right="onSwipeRight"
      class="main-pane"
    >
      <nuxt />
    </div>
    <bottom-pane class="bottom-pane" />
  </div>
</template>

<script>
import BottomPane from '~/components/BottomPane'
import TopPane from '~/components/TopPane'

function clientXFromEvent (event) {
  if (event.type.indexOf('mouse') !== -1) {
    return event.clientX
  }
  return event.touches[0].clientX
}

export default {
  components: {
    BottomPane,
    TopPane
  },
  data () {
    return {
      touchStartX: 0
    }
  },
  methods: {
    // Back-to-parent-view gesture support.
    onSwipeRight (e) {
      const screenLeftEdgeWidth = window.innerWidth * 20 / 100
      if (this.touchStartX < screenLeftEdgeWidth) {
        // TODO: Should use page stack.
        this.$router.back()
      }
    },
    onTouchStart (e) {
      this.touchStartX = clientXFromEvent(e)
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
}

.bottom-pane {
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 1;
}

</style>
