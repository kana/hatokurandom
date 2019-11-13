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
  computed: {
    pid () {
      return this.$route.params.pid
    }
  },
  methods: {
    isCardListPid,
    isPageListPid
  },
  head () {
    return {
      title: titleTagValueFromPid(this.$route.params.pid),
      meta: ogpMetaFromPid(this.$route.params.pid)
    }
  },
  transition,
  validate ({ params }) {
    return params.pid === 'supplies:log' ||
      isCardListPid(params.pid) ||
      isPageListPid(params.pid)
  }
}
</script>

<style scoped>
</style>
