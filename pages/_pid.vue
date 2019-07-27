<template>
  <div class="page">
    <card-list v-if="isCardListPid(pid)" :pid="pid" />
    <page-list v-if="isPageListPid(pid)" :pid="pid" />
  </div>
</template>

<script>
import CardList from '~/components/CardList'
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
.page {
  background: #eef;
}
</style>
