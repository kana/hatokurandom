<template>
  <div class="top-pane">
    <div v-if="isBackButtonAvailable" class="back-button" @click="back">
      [&lt;]
    </div>
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<script>
import { pidFromPath, titleFromPid } from '~/lib/constants'

export default {
  name: 'TopPane',
  computed: {
    isBackButtonAvailable () {
      return true // TODO
    },
    title () {
      return titleFromPid(pidFromPath(this.$route.path))
    }
  },
  methods: {
    back () {
      this.$router.back()
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
  width: 100%;
}

.back-button {
  cursor: pointer;
  flex: none;
  height: 1em;
  margin-left: 1em;
  margin-right: -2em;
  width: 1em;
}

</style>
