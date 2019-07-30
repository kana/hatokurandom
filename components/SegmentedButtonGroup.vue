<template>
  <div class="segmented-button-group">
    <label
      v-for="choice in choices"
      :key="choice.value"
      :class="{ checked: value === choice.value }"
      class="segmented-button"
      @click="$emit('input', choice.value)"
    >
      {{ choice.label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'SegmentedButtonGroup',
  props: {
    choices: {
      type: Array, // { label: String, value: String }[]
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

.segmented-button-group {
  display: inline-block;
  white-space: nowrap;
}

.segmented-button {
  background: var(--switch-off-background-color);
  border: 1px solid var(--switch-off-border-color);
  cursor: pointer;
  display: inline-block;
  margin: 0;
  padding: 0.5ex 1ex;
  transition: background 0.2s, color 0.2s;
}

.segmented-button:hover {
  background: var(--header-background-color);
  color: var(--item-label-color);
}

.segmented-button.checked {
  background: var(--switch-on-background-color);
  color: var(--switch-knob-color);
}

.segmented-button:first-child {
  border-radius: 0.5em 0 0 0.5em;
}

.segmented-button:last-child {
  border-radius: 0 0.5em 0.5em 0;
}

.segmented-button + .segmented-button {
  border-left: none;
}

</style>
