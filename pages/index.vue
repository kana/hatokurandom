<template>
  <div class="page">
    <page-list pid="home" />
  </div>
</template>

<script>
import PageList from '~/components/PageList'

export default {
  components: {
    PageList
  }
}
</script>

<style scoped>
.page {
  background: #eef;
}
</style>
