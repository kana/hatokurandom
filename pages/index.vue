<template>
  <page-container>
    <page-list pid="home" />
  </page-container>
</template>

<script>
import PageContainer from '~/components/PageContainer'
import PageList from '~/components/PageList'
import { isCardListPid, isPageListPid, titleFromPid } from '~/lib/constants'

export default {
  head: {
    title: titleFromPid('home'),
    titleTemplate: null
  },
  components: {
    PageContainer,
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
</style>
