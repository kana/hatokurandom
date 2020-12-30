<template>
  <page-container>
    [[ {{ card.name }} ]]
    [[ {{ card.types }} ]]
  </page-container>
</template>

<script>
import PageContainer from '~/components/PageContainer'
import { cardFromCid, pidFromPath, ogpMetaFromPid, titleTagValueFromPid, transition } from '~/lib/utils'

export default {
  components: {
    PageContainer
  },
  validate ({ params }) {
    return cardFromCid(parseInt(params.cid, 10)) !== undefined
  },
  transition,
  head () {
    const pid = pidFromPath(this.$route.path)
    return {
      title: titleTagValueFromPid(pid),
      meta: ogpMetaFromPid(pid)
    }
  },
  computed: {
    card () {
      return cardFromCid(this.cid)
    },
    cid () {
      return parseInt(this.$route.params.cid, 10)
    }
  }
}
</script>

<style scoped>
</style>
