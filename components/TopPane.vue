<template>
  <div class="top-pane">
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopPane',
  data () {
    return {
      title: 'ハトクランダム'
    }
  },
  computed: {
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
