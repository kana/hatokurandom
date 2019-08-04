<template>
  <div class="page-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PageContainer'
}
</script>

<style scoped>

.page-container {
  background: var(--page-background-color);
  box-sizing: border-box;
  min-height: 100vh;
  padding: 2em 0;
}

</style>
