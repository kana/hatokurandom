<template>
  <omni-list-item :props="{ is: 'label' }" clickable>
    <div class="line">
      <span class="title">
        {{ title }}
      </span>
      <input v-model="value" type="checkbox" class="form">
    </div>
  </omni-list-item>
</template>

<script>
import OmniListItem from '~/components/OmniListItem'

export default {
  name: 'SwitchListItem',
  components: {
    OmniListItem
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

.line {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.title {
}

.form {
  flex: none;
  margin-left: 1em;
}

</style>
