<template>
  <div class="block-title">
    <span class="text">
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: 'BlockTitle'
}
</script>

<style scoped>

.block-title {
  margin: 2em 1em 0.25em;
}

.text {
  color: var(--block-title-text-color);
  font-size: 80%;
}

</style>
