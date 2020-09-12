<template>
  <component
    :is="component"
    :path="path"
    :class="{ clickable }"
    class="list-item"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'OmniListItem',
  props: {
    clickable: {
      type: Boolean,
      default: false
    },
    component: {
      type: String,
      default: 'div'
    },
    path: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>

.list-item {
  align-items: center;
  border-bottom: 1px solid var(--item-separator-color);
  color: var(--item-label-color);
  display: flex;
  justify-content: flex-start;
  margin: 0;
  padding: 0.5em 1em;
  transition: background 0.2s;
}

.list-item.clickable {
  cursor: pointer;
}

@media (hover) {
  .list-item.clickable:hover {
    background: var(--header-background-color);
  }
}

</style>
