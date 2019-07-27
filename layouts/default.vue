<template>
  <div class="app">
    <top-pane />
    <nuxt />
    <bottom-pane />
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
</style>
