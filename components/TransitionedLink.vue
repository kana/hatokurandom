<template>
  <nuxt-link :to="normalizedTo">
    <slot />
  </nuxt-link>
</template>

<script>
import { pidFromPath } from '~/lib/utils'

const staticRouteNameMap = new Map([
  ['/', 'index'],
  ['/about', 'about'],
  ['/preferences', 'preferences'],
  ['/preferences/banned-cards', 'preferences-banned-cards']
])

export default {
  props: {
    path: {
      type: String,
      required: true
    }
  },
  computed: {
    normalizedTo () {
      const name = staticRouteNameMap.get(this.path) || 'pid'
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
