<template>
  <ul class="list">
    <slot />
  </ul>
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
  border-style: solid none;
  border-width: 1px;
  list-style: none;
  margin: 0;
  padding: 0;
}

</style>
