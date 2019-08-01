<template>
  <omni-list-item
    :to="path"
    component="nuxt-link"
    clickable
    class="link"
  >
    <slot />
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
    }
  }
}
</script>

<style scoped>

.link {
  color: var(--link-text-color);
}

</style>
