<template>
  <span class="trigger">
    <slot />
  </span>
</template>

<script>
export default {
}
</script>

<style scoped>

.trigger::before {
  content: "（";
}

.trigger::after {
  content: "）";
}

.trigger {
  color: #666;
}

</style>
