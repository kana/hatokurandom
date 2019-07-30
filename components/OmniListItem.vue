<template>
  <li class="list-item">
    <component :is="props.is || 'div'" v-bind="props" class="list-item-content">
      <slot />
    </component>
  </li>
</template>

<script>
export default {
  name: 'OmniListItem',
  props: {
    props: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>

.list-item {
  margin: 0;
  padding: 0;
}

.list-item + .list-item {
  border-top: 1px solid var(--item-separator-color);
}

.list-item-content {
  color: var(--item-label-color);
  padding: 0.5em 1em;
  text-decoration: none;
  display: block;
  transition: background 0.2s;
}

.list-item-content:hover {
  background: var(--header-background-color);
}

</style>
