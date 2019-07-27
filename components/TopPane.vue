<template>
  <div class="top-pane">
    <div v-if="parentPid" class="back-to-parent-button" @click="backToParent">
      [&lt;]
    </div>
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<script>
import { parentPidFromPid, pidFromPath, titleFromPid } from '~/lib/constants'

export default {
  name: 'TopPane',
  computed: {
    parentPid () {
      return parentPidFromPid(pidFromPath(this.$route.path))
    },
    title () {
      return titleFromPid(pidFromPath(this.$route.path))
    }
  },
  methods: {
    backToParent () {
      this.$router.push(this.parentPid)
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

.back-to-parent-button {
  cursor: pointer;
  flex: none;
  height: 1em;
  margin-left: 1em;
  margin-right: -2em;
  width: 1em;
}

</style>
