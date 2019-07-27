<template>
  <div class="bottom-pane">
    <nuxt-link to="/" class="tab">
      [Home]
    </nuxt-link>
    <nuxt-link to="/configure" class="tab">
      [Preferences]
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'BottomPane'
}
</script>

<style scoped>

.bottom-pane {
  align-items: center;
  background: #eee;
  border-top: 1px solid #ddd;
  display: flex;
  height: 3em;
  justify-content: center;
}

.tab {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}

.tab + .tab {
  border-left: 1px solid #ddd;
}

</style>
