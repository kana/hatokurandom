<template>
  <omni-list-item
    :props="{
      is: 'nuxt-link',
      to: path
    }"
    clickable
  >
    <div class="line">
      <span class="label">{{ title }}</span>
      <font-awesome-icon icon="angle-right" size="lg" class="icon" />
    </div>
  </omni-list-item>
</template>

<script>
import OmniListItem from '~/components/OmniListItem'

export default {
  name: 'LinkListItem',
  components: {
    OmniListItem
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
