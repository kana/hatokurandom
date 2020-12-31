<template>
  <span class="coin">
    <slot />
  </span>
</template>

<script>
export default {
}
</script>

<style scoped>

.coin {
  background: #CCCC99; /* XXX: Better coloring. */
  border-radius: 1em;
  display: inline-block;
  height: 1em;
  min-width: 1em;
  text-align: center;
}

</style>
