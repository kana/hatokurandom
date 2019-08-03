<template>
  <omni-list class="page-list">
    <template v-if="pid">
      <page-list-item
        v-for="childPid in childPids"
        :key="childPid"
        :path="pathFromPid(childPid)"
        :title="titleFromPid(childPid)"
      />
    </template>
    <slot v-if="!pid" />
  </omni-list>
</template>

<script>
import OmniList from '~/components/OmniList'
import PageListItem from '~/components/PageListItem'
import { childPidsFromPid, pathFromPid, titleFromPid } from '~/lib/constants'

export default {
  name: 'PageList',
  components: {
    OmniList,
    PageListItem
  },
  props: {
    pid: {
      type: String,
      default: null
    }
  },
  computed: {
    childPids () {
      return childPidsFromPid(this.pid)
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
