<template>
  <nuxt-link :to="normalizedTo">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      required: true
    }
  },
  computed: {
    normalizedTo () {
      return this.$props.to
    }
  }
}
</script>

<style scoped>
</style>
