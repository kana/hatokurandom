<template>
  <div class="page">
    <ul class="link-list">
      <li class="link-item">
        <nuxt-link to="/">
          Home
        </nuxt-link>
      </li>
      <li class="link-item">
        <nuxt-link to="/expansion/basic">
          Basic
        </nuxt-link>
      </li>
      <li class="link-item">
        <nuxt-link to="/about">
          About this app
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.page {
  background: #fee;
}
</style>
