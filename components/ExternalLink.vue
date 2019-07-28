<template>
  <a :href="href" target="_blank">
    {{ label }}
  </a>
</template>

<script>
export default {
  name: 'ExternalLink',
  props: {
    href: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
