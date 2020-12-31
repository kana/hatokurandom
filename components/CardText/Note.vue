<template>
  <span class="note">
    <slot />
  </span>
</template>

<script>
export default {
}
</script>

<style scoped>

.note::before {
  content: "（";
}

.note::after {
  content: "）";
}

.note {
  font-size: 80%;
}

</style>
