<template>
  <li class="card">
    <label class="label">
      <input v-if="editable" v-show="false" v-model="xcard.dropped" type="checkbox">
      {{ xcard.name }}
    </label>
  </li>
</template>

<script>
export default {
  name: 'CardListItem',
  props: {
    editable: {
      type: Boolean,
      required: true
    },
    xcard: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

.label {
  cursor: pointer;
  width: 100%;
}

</style>
