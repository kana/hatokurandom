<template>
  <link-list-item :path="path" class="line">
    <div class="left">
      <span class="label">{{ title }}</span>
      <span v-if="at" class="at">{{ at }}</span>
    </div>
    <div class="right">
      <font-awesome-icon icon="angle-right" size="lg" class="icon" />
    </div>
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
    at: {
      type: String,
      default: null
    },
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

.left {
  align-content: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
}

.left .label {
  color: var(--item-label-color);
}

.left .at {
  color: var(--item-value-color);
  font-size: 80%;
}

.right {
  flex: none;
}

.right .icon {
  color: var(--item-next-icon-color);
}

</style>
