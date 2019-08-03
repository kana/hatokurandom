<template>
  <page-list>
    <page-list-item
      v-for="childPid in childPids"
      :key="childPid"
      :path="pathFromPid(childPid)"
      :title="titleFromPid(childPid)"
    />
  </page-list>
</template>

<script>
import PageList from '~/components/PageList'
import PageListItem from '~/components/PageListItem'
import { pathFromPid, pidFromSid, titleFromPid } from '~/lib/constants'

export default {
  components: {
    PageList,
    PageListItem
  },
  computed: {
    childPids () {
      return this.$store.state.log.items.map(item => pidFromSid(item.sid))
    }
  },
  methods: {
    pathFromPid,
    titleFromPid
  }
}
</script>

<style scoped>
</style>
