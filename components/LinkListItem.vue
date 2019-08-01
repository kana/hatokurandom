<template>
  <omni-list-item
    :to="path"
    component="nuxt-link"
    clickable
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
</style>
