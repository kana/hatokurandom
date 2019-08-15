<template>
  <page-container>
    <page-list pid="home" />
  </page-container>
</template>

<script>
import PageContainer from '~/components/PageContainer'
import PageList from '~/components/PageList'
import { isCardListPid, isPageListPid, titleFromPid, transition } from '~/lib/utils'

export default {
  components: {
    PageContainer,
    PageList
  },
  head: {
    title: titleFromPid('home'),
    titleTemplate: null
  },
  transition,
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
