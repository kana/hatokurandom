<template>
  <div :class="value ? 'on' : 'off'" class="switch-box">
    <div class="knob">
      <input v-show="false" v-model="model" type="checkbox">
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwitchBox',
  props: {
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

.switch-box {
  background: var(--switch-off-background-color);
  border-radius: 1.44em;
  border: 1px solid var(--switch-off-border-color);
  box-sizing: border-box;
  height: 1.44em;
  transition: background 0.2s, border-color 0.2s;
  width: calc((1.44em - 4px) * 2);
}

.switch-box.on {
  background: var(--switch-on-background-color);
  border-color: var(--switch-on-background-color);
}

.knob {
  background: var(--switch-knob-color);
  border-radius: 1.44em;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 3px 1px;
  height: calc(1.44em - 2px);
  margin-left: 0;
  transition: margin-left 0.2s;
  width: calc(1.44em - 2px);
}

.switch-box.on .knob {
  margin-left: calc((1.44em - 4px) - 4px);
}

</style>
