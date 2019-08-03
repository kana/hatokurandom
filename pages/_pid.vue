<template>
  <page-container>
    <card-list v-if="isCardListPid(pid)" :pid="pid" />
    <page-list v-if="isPageListPid(pid)" :pid="pid" />
  </page-container>
</template>

<script>
import CardList from '~/components/CardList'
import PageContainer from '~/components/PageContainer'
import PageList from '~/components/PageList'
import { isCardListPid, isPageListPid, titleFromPid } from '~/lib/constants'

export default {
  validate ({ params }) {
    return isCardListPid(params.pid) || isPageListPid(params.pid)
  },
  head () {
    return {
      title: titleFromPid(this.$route.params.pid)
    }
  },
  components: {
    CardList,
    PageContainer,
    PageList
  },
  computed: {
    pid () {
      return this.$route.params.pid
    }
  },
  methods: {
    isCardListPid,
    isPageListPid
  }
}
</script>

<style scoped>
</style>
