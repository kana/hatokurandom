<template>
  <a :href="href" target="_blank" class="link">
    <span class="label">{{ label }}</span>
    <font-awesome-icon icon="external-link-alt" size="xs" class="icon" />
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
