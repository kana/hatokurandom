<template>
  <omni-list class="page-list">
    <page-list-item
      v-for="childPid in childPids"
      :key="childPid"
      :path="pathFromPid(childPid)"
      :title="titleFromPid(childPid)"
    />
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
      required: true
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

.page-list {
  margin-top: 2em;
}

</style>
