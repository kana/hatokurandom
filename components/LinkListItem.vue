<template>
  <omni-list-item
    :path="path"
    component="transitioned-link"
    clickable
    class="link-list-item link"
  >
    <slot />
  </omni-list-item>
</template>

<script>
import OmniListItem from '~/components/OmniListItem'

// TransitionedLink is preloaded.
// Importing and adding it to 'components' don't work for some reason.

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

.link-list-item.link {
  color: var(--link-text-color);
}

</style>
