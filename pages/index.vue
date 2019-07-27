<template>
  <div class="page">
    <page-list pid="home" />
  </div>
</template>

<script>
import PageList from '~/components/PageList'
import { isCardListPid, isPageListPid } from '~/lib/constants'

export default {
  components: {
    PageList
  },
  mounted () {
    // Redirect old URL (/#supply:random10) to new URL (/supply:random10).
    if (this.$route.hash !== '') {
      const pid = this.$route.hash.slice(1)
      if (isCardListPid(pid) || isPageListPid(pid)) {
        this.$router.replace(`/${pid}`)
      }
    }
  }
}
</script>

<style scoped>
.page {
  background: #eef;
}
</style>
