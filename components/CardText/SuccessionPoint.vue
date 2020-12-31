<template>
  <span class="succession-point">
    <slot />
  </span>
</template>

<script>
export default {
}
</script>

<style scoped>

.succession-point::before {
  content: "継承点 ";
}

</style>
