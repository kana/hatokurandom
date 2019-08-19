<template>
  <link-list-item :path="path" class="line">
    <div class="left">
      <div class="above">
        <span class="label">{{ title }}</span>
        <span v-if="at" class="at">{{ at }}</span>
      </div>
      <span v-if="excerpt" class="excerpt">{{ excerpt }}</span>
    </div>
    <div class="right">
      <font-awesome-icon icon="angle-right" size="lg" class="icon" />
    </div>
    <transition name="shift">
      <div v-if="deletable" class="delete" @click="onClick">
        <font-awesome-icon icon="trash-alt" size="lg" class="icon" />
      </div>
    </transition>
  </link-list-item>
</template>

<script>
import LinkListItem from '~/components/LinkListItem'

export default {
  name: 'PageListItem',
  components: {
    LinkListItem
  },
  props: {
    at: {
      type: String,
      default: null
    },
    deletable: {
      type: Boolean,
      default: false
    },
    excerpt: {
      type: String,
      default: null
    },
    path: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick (e) {
      e.preventDefault()
      this.$emit('delete')
    }
  }
}
</script>

<style scoped>

.line {
  position: relative;
}

.left {
  align-items: center;
  display: flex;
  width: calc(100% - 2em);
}

.left .above {
  display: flex;
  flex-direction: column;
}

.left .label {
  color: var(--item-label-color);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.left .excerpt {
  color: var(--item-value-color);
  font-size: 80%;
  margin-left: auto;
  overflow: hidden;
  padding-left: 1em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.left .at {
  color: var(--item-value-color);
  font-size: 80%;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.right {
  flex: none;
  margin-left: auto;
  padding-left: 1em;
}

.right .icon {
  color: var(--item-next-icon-color);
}

.delete {
  align-items: center;
  background: var(--delete-background-color);
  color: var(--delete-text-color);
  display: flex;
  flex: none;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 4em;
}

.shift-enter-active,
.shift-leave-active {
  transition: right 0.4s;
}

.shift-enter,
.shift-leave-to {
  right: -4em;
}

.shift-enter-to,
.shift-leave {
  right: 0;
}

</style>
