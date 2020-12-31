<template>
  <div class="unit">
    <slot />
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

.unit + .unit {
  margin-top: 1ex;
}

</style>
