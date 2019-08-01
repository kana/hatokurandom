<template>
  <omni-list-item clickable class="line" @click="$emit('click')">
    <slot />
  </omni-list-item>
</template>

<script>
import OmniListItem from '~/components/OmniListItem'

export default {
  name: 'LinkButtonListItem',
  components: {
    OmniListItem
  }
}
</script>

<style scoped>

.line {
  color: var(--link-text-color);
}

</style>
