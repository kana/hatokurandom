<template>
  <ul class="list">
    <li v-for="childPid in childPids" :key="childPid" class="list-item">
      <nuxt-link :to="pathFromPid(childPid)" class="link">
        <span class="label">{{ titleFromPid(childPid) }}</span>
        <span class="icon">＞</span>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
import { childPidsFromPid, pathFromPid, titleFromPid } from '~/lib/constants'

export default {
  name: 'PageList',
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

.list {
  background: var(--item-background-color);
  border-color: var(--item-separator-color);
  border-style: solid none;
  border-width: 1px;
  list-style: none;
  margin: 2em 0;
  padding: 0;
}

.list-item {
  margin: 0;
  padding: 0;
}

.list-item + .list-item {
  border-top: 1px solid var(--item-separator-color);
}

.link {
  align-items: center;
  color: var(--item-label-color);
  display: flex;
  justify-content: flex-start;
  padding: 0.5em 1em;
  text-decoration: none;
  transition: background 0.2s;
}

.link:hover {
  background: var(--header-background-color);
}

.link .label {
  width: 100%;
}

.link .icon {
  color: var(--item-next-icon-color);
  flex: none;
  font-weight: bolder;
}

</style>
