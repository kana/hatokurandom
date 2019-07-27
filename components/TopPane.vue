<template>
  <div class="top-pane">
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<script>
import { titleFromPid } from '~/lib/constants'

export default {
  name: 'TopPane',
  computed: {
    title () {
      const pid = this.$route.path.slice(1)
      return titleFromPid(pid || 'home')
    }
  }
}
</script>

<style scoped>

.top-pane {
  align-items: center;
  background: #eee;
  border-bottom: 1px solid #ddd;
  display: flex;
  height: 3em;
  justify-content: center;
}

.title {
  font-size: 144%;
  text-align: center;
}

</style>
