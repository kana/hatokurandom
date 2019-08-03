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
import { pathFromPid, titleFromPid } from '~/lib/constants'

export default {
  components: {
    PageList,
    PageListItem
  },
  computed: {
    childPids () {
      return [
        'supplies:six',
        'supply:random12'
      ]
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
