<template>
  <div class="list">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'OmniList'
}
</script>

<style scoped>

.list {
  background: var(--item-background-color);
  border-color: var(--item-separator-color);
  border-style: solid none none;
  border-width: 1px;
  margin: 0;
  padding: 0;
}

</style>
