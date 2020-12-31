<template>
  <div class="mode">
    <slot />
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

.mode::before {
  content: "『";
}

.mode::after {
  content: "』";
}

</style>
