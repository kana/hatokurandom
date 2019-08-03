<template>
  <div class="shuffle-button">
    <div class="icon" @click="$emit('click')">
      <font-awesome-icon icon="sync-alt" size="lg" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShuffleButton'
}
</script>

<style scoped>

.shuffle-button {
  align-items: center;
  background: var(--link-text-color);
  border-radius: 3.5em;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px 1px;
  color: var(--switch-knob-color);
  cursor: pointer;
  display: flex;
  height: 3.5em;
  justify-content: center;
  margin-bottom: 1ex;
  margin-right: 1ex;
  width: 3.5em;
}

.shuffle-button .icon {
  align-items: center;
  border-radius: 3.5em;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  transition: background 0.2s;
  width: 100%;
}

@media (hover) {
  .shuffle-button .icon:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

</style>
