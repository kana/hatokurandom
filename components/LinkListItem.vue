<template>
  <omni-list-item
    :props="{
      is: 'nuxt-link',
      to: path
    }"
    clickable
  >
    <div class="link">
      <slot />
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
    }
  }
}
</script>

<style scoped>

.link {
  color: var(--link-text-color);
}

</style>
