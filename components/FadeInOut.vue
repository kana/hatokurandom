<template>
  <transition name="fade" appear>
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'FadeInOut'
}
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
