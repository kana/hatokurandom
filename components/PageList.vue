<template>
  <omni-list class="page-list">
    <link-list-item
      v-for="childPid in childPids"
      :key="childPid"
      :path="pathFromPid(childPid)"
      :title="titleFromPid(childPid)"
    />
  </omni-list>
</template>

<script>
import LinkListItem from '~/components/LinkListItem'
import OmniList from '~/components/OmniList'
import { childPidsFromPid, pathFromPid, titleFromPid } from '~/lib/constants'

export default {
  name: 'PageList',
  components: {
    LinkListItem,
    OmniList
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
