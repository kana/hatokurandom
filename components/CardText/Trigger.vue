<template>
  <span>
    <span class="trigger-border" />
    <span class="trigger">
      <slot />
    </span>
  </span>
</template>

<script>
export default {
}
</script>

<style scoped>

.trigger-border {
  border-top: 1px solid #999;
  box-sizing: border-box;
  display: block;
  margin: 0 1ex 0;
  padding: 1ex 0 0;
}

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
