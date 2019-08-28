<template>
  <page-list>
    <transition-group :name="transitionType" tag="div">
      <page-list-item
        v-for="(item, i) in items"
        :key="item.at"
        v-touch="onTouch"
        v-touch:end="onTouchEnd"
        v-touch:moving="onTouchMoving"
        v-touch:swipe.left="onSwipeLeft"
        v-touch:swipe.right="onSwipeRight"
        :path="item.path"
        :title="item.title"
        :excerpt="item.excerpt"
        :at="item.at"
        :deletable="i === deletableIndex"
        :dx="i === currentlySwipedIndex && i !== deletableIndex ? dx : 0"
        :data-index="i"
        @delete="onDelete(i)"
      />
    </transition-group>
    <omni-list-item v-if="items.length === 0" class="list-item empty-message">
      ログがありません。
    </omni-list-item>
  </page-list>
</template>

<script>
import OmniListItem from '~/components/OmniListItem'
import PageList from '~/components/PageList'
import PageListItem from '~/components/PageListItem'
import { excerptFromPid, pathFromPid, pidFromSid, titleFromPid } from '~/lib/utils'

export default {
  components: {
    OmniListItem,
    PageList,
    PageListItem
  },
  data () {
    return {
      currentlySwipedIndex: -1,
      deletableIndex: -1,
      dx: 0,
      transitionType: 'none'
    }
  },
  computed: {
    items () {
      return this.$store.state.log.items.map((item) => {
        const pid = pidFromSid(item.sid)
        return {
          pid,
          path: pathFromPid(pid),
          title: titleFromPid(pid),
          excerpt: excerptFromPid(pid),
          at: this.formatDateTime(new Date(item.at))
        }
      })
    }
  },
  updated () {
    // Avoid page-list-item transition on reload.
    this.transitionType = 'height'
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
    onSwipeLeft (_left, e) {
      this.deletableIndex = parseInt(e.currentTarget.dataset.index, 10)
    },
    onSwipeRight () {
      this.deletableIndex = -1
    },
    onTouch (e) {
      if (this.deletableIndex !== -1) {
        this.deletableIndex = -1
        e.preventDefault()
      }
    },
    onTouchEnd (e) {
      const i = parseInt(e.currentTarget.dataset.index, 10)
      if (this.currentlySwipedIndex === i) {
        e.preventDefault()
      }

      this.currentlySwipedIndex = -1
      this.dx = 0
    },
    onTouchMoving (e) {
      const t = e.currentTarget.$$touchObj
      this.dx = Math.abs(t.currentX - t.startX)
      this.currentlySwipedIndex = parseInt(e.currentTarget.dataset.index, 10)
      if (this.deletableIndex !== this.currentlySwipedIndex) {
        this.deletableIndex = -1
      }
    },
    onDelete (index) {
      this.$store.dispatch('log/delete', { index })
      this.deletableIndex = -1
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

.height-enter-active,
.height-leave-active {
  overflow: hidden;
  transition: max-height 0.4s, padding 0.4s;
}

.height-enter,
.height-leave-to {
  max-height: 0;
  padding-bottom: 0;
  padding-top: 0;
}
.height-enter-to,
.height-leave {
  max-height: 2.5em;
}

</style>
