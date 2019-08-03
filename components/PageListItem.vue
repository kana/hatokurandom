<template>
  <link-list-item :path="path" class="line">
    <div class="left">
      <div class="above">
        <span class="label">{{ title }}</span>
        <span v-if="excerpt" class="excerpt">{{ excerpt }}</span>
      </div>
      <div v-if="at" class="at">
        {{ at }}
      </div>
    </div>
    <div class="right">
      <font-awesome-icon icon="angle-right" size="lg" class="icon" />
    </div>
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
  }
}
</script>

<style scoped>

.left {
  width: calc(100% - 2em);
}

.left .above {
  align-items: flex-end;
  display: flex;
}

.left .above .label {
  color: var(--item-label-color);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.left .above .excerpt {
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
}

.right {
  flex: none;
  margin-left: auto;
  padding-left: 1em;
}

.right .icon {
  color: var(--item-next-icon-color);
}

</style>
