<template>
  <div class="page">
    <card-list v-if="cids" :cids="cids" />
    <page-list v-if="childPids" :pids="childPids" />
  </div>
</template>

<script>
import CardList from '~/components/CardList'
import PageList from '~/components/PageList'
import { childPidsFromPid, cidsFromPid } from '~/lib/constants'

export default {
  validate ({ params }) {
    return childPidsFromPid(params.pid) !== undefined ||
      cidsFromPid(params.pid) !== undefined
  },
  components: {
    CardList,
    PageList
  },
  computed: {
    childPids () {
      return childPidsFromPid(this.$route.params.pid)
    },
    cids () {
      return cidsFromPid(this.$route.params.pid)
    }
  }
}
</script>

<style scoped>
.page {
  background: #eef;
}
</style>
