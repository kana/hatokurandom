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
  margin: 2em 0;
}

</style>
