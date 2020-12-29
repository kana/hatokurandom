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
import { isCardListPid, isPageListPid, ogpMetaFromPid, titleTagValueFromPid, transition } from '~/lib/utils'

export default {
  components: {
    CardList,
    LogPage,
    PageContainer,
    PageList
  },
  validate ({ params }) {
    return params.pid === 'supplies:log' ||
      isCardListPid(params.pid) ||
      isPageListPid(params.pid)
  },
  transition,
  head () {
    return {
      title: titleTagValueFromPid(this.$route.params.pid),
      meta: ogpMetaFromPid(this.$route.params.pid)
    }
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
