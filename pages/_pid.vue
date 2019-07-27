<template>
  <div class="page">
    <page-list :pids="childPids" />
  </div>
</template>

<script>
import PageList from '~/components/PageList'
import { childPidsFromPid } from '~/lib/constants'

export default {
  validate ({ params }) {
    return childPidsFromPid(params.pid) !== undefined
  },
  components: {
    PageList
  },
  computed: {
    childPids () {
      return childPidsFromPid(this.$route.params.pid)
    }
  }
}
</script>

<style scoped>
.page {
  background: #eef;
}
</style>
