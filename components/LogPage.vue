<template>
  <page-list>
    <page-list-item
      v-for="item in items"
      :key="item.pid"
      :path="item.path"
      :title="item.title"
      :excerpt="item.excerpt"
      :at="item.at"
    />
    <omni-list-item v-if="items.length === 0" class="list-item empty-message">
      ログがありません。
    </omni-list-item>
  </page-list>
</template>

<script>
import OmniListItem from '~/components/OmniListItem'
import PageList from '~/components/PageList'
import PageListItem from '~/components/PageListItem'
import { excerptFromPid, pathFromPid, pidFromSid, titleFromPid } from '~/lib/constants'

export default {
  components: {
    OmniListItem,
    PageList,
    PageListItem
  },
  computed: {
    items () {
      const items = this.$store.state.log.items.map((item) => {
        const pid = pidFromSid(item.sid)
        return {
          pid,
          path: pathFromPid(pid),
          title: titleFromPid(pid),
          excerpt: excerptFromPid(pid),
          at: this.formatDateTime(new Date(item.at))
        }
      })
      items.reverse()
      return items
    }
  },
  methods: {
    formatDateTime (dateTime) {
      const yyyy = this.pad(dateTime.getFullYear(), 4)
      const mm = this.pad(dateTime.getMonth() + 1, 2)
      const dd = this.pad(dateTime.getDate(), 2)
      const HH = this.pad(dateTime.getHours(), 2)
      const MM = this.pad(dateTime.getMinutes(), 2)
      const SS = this.pad(dateTime.getSeconds(), 2)
      return `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}`
    },
    pad (n, width) {
      let s = n.toString()
      while (s.length < width) {
        s = `0${s}`
      }
      return s
    }
  }
}
</script>

<style scoped>

.list-item.empty-message {
  color: var(--item-value-color);
}

</style>
