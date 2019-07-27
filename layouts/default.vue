<template>
  <div class="app">
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

export default {
  components: {
    BottomPane,
    TopPane
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
}

.main-pane {
  padding: 3em 0;
}

.bottom-pane {
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
}

</style>
