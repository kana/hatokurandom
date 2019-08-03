<template>
  <page-container>
    <log-page v-if="pid === 'supplies:log'" />
    <card-list v-else-if="isCardListPid(pid)" :pid="pid" />
    <page-list v-else-if="isPageListPid(pid)" :pid="pid" />
  </page-container>
</template>

<script>
import CardList from '~/components/CardList'
import LogPage from '~/components/LogPage'
import PageContainer from '~/components/PageContainer'
import PageList from '~/components/PageList'
import { isCardListPid, isPageListPid, titleFromPid } from '~/lib/constants'

export default {
  validate ({ params }) {
    return params.pid === 'supplies:log' ||
      isCardListPid(params.pid) ||
      isPageListPid(params.pid)
  },
  head () {
    return {
      title: titleFromPid(this.$route.params.pid)
    }
  },
  components: {
    CardList,
    LogPage,
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
