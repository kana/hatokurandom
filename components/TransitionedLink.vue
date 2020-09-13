<template>
  <nuxt-link :to="normalizedTo">
    <slot />
  </nuxt-link>
</template>

<script>
import { toFromPath } from '~/lib/router'

export default {
  props: {
    path: {
      type: String,
      required: true
    }
  },
  computed: {
    normalizedTo () {
      return toFromPath(this.path, { transition: true })
    }
  }
}
</script>

<style scoped>
</style>
