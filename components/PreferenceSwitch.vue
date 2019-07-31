<template>
  <div class="preference-switch">
    <omni-list>
      <switch-list-item v-model="value" :title="title" />
    </omni-list>
    <div class="note">
      <div class="text">
        <slot name="note" />
      </div>
    </div>
  </div>
</template>

<script>
import OmniList from '~/components/OmniList'
import SwitchListItem from '~/components/SwitchListItem'

export default {
  name: 'PreferenceSwitch',
  components: {
    OmniList,
    SwitchListItem
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
  }
}
</script>

<style scoped>

.preference-switch {
}

.note {
  margin: 0.5em 1em 1.5em;
}

.text {
  color: var(--item-value-color);
  font-size: 80%;
}

</style>
