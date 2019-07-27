<template>
  <div class="page">
    <card-list :pid="pid" />
    <page-list :pid="pid" />
  </div>
</template>

<script>
import CardList from '~/components/CardList'
import PageList from '~/components/PageList'
import { isCardListPid, isPageListPid } from '~/lib/constants'

export default {
  validate ({ params }) {
    return isCardListPid(params.pid) || isPageListPid(params.pid)
  },
  components: {
    CardList,
    PageList
  },
  computed: {
    pid () {
      return this.$route.params.pid
    }
  }
}
</script>

<style scoped>
.page {
  background: #eef;
}
</style>
