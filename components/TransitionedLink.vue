<template>
  <nuxt-link :to="normalizedTo">
    <slot />
  </nuxt-link>
</template>

<script>
import { nameFromPath } from '~/lib/router'
import { pidFromPath } from '~/lib/utils'

export default {
  props: {
    path: {
      type: String,
      required: true
    }
  },
  computed: {
    normalizedTo () {
      const name = nameFromPath(this.path)
      const pid = name !== 'pid' ? undefined : pidFromPath(this.path)
      return {
        name,
        params: {
          pid,
          transition: true
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
