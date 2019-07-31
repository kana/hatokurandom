<template>
  <omni-list-item :props="{ is: 'label' }" clickable>
    <div class="line">
      <span class="title">
        {{ title }}
      </span>
      <switch-box v-model="value" class="form" />
    </div>
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
