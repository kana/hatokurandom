<template>
  <link-list-item :path="path" class="line">
    <span class="label">{{ title }}</span>
    <font-awesome-icon icon="angle-right" size="lg" class="icon" />
  </link-list-item>
</template>

<script>
import LinkListItem from '~/components/LinkListItem'

export default {
  name: 'PageListItem',
  components: {
    LinkListItem
  },
  props: {
    path: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

.line {
  align-items: center;
  color: var(--item-label-color);
  display: flex;
  justify-content: flex-start;
}

.line .label {
  width: 100%;
}

.line .icon {
  color: var(--item-next-icon-color);
  flex: none;
}

</style>
