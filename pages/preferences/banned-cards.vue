<template>
  <div class="page">
    ...
  </div>
</template>

<script>
import { titleFromPid } from '~/lib/constants'

export default {
  head: {
    title: titleFromPid('preferences/banned-cards')
  }
}
</script>

<style scoped>

.page {
  margin: 2em 0;
}

</style>
