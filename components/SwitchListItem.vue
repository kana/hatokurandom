<template>
  <omni-list-item component="label" clickable>
    <span class="title">
      {{ title }}
    </span>
    <switch-box v-model="model" class="form" />
  </omni-list-item>
</template>

<script>
import OmniListItem from '~/components/OmniListItem'
import SwitchBox from '~/components/SwitchBox'

export default {
  name: 'SwitchListItem',
  components: {
    OmniListItem,
    SwitchBox
  },
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>

.title {
  width: 100%;
}

.form {
  flex: none;
  margin-left: 1em;
}

</style>
