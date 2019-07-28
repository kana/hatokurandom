<template>
  <omni-list class="page-list">
    <omni-list-item
      v-for="childPid in childPids"
      :key="childPid"
      :props="{
        is: 'nuxt-link',
        to: pathFromPid(childPid)
      }"
    >
      <div class="line">
        <span class="label">{{ titleFromPid(childPid) }}</span>
        <span class="icon">＞</span>
      </div>
    </omni-list-item>
  </omni-list>
</template>

<script>
import OmniList from '~/components/OmniList'
import OmniListItem from '~/components/OmniListItem'
import { childPidsFromPid, pathFromPid, titleFromPid } from '~/lib/constants'

export default {
  name: 'PageList',
  components: {
    OmniList,
    OmniListItem
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

.line {
  align-items: center;
  display: flex;
  justify-content: flex-start;
}

.line .label {
  width: 100%;
}

.line .icon {
  color: var(--item-next-icon-color);
  flex: none;
  font-weight: bolder;
}

</style>
