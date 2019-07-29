<template>
  <div class="page">
    - 使用するカードセット
    - 禁止カード
    - 偏り具合の調整
    - 共有方法
  </div>
</template>

<script>
import { titleFromPid } from '~/lib/constants'

export default {
  head: {
    title: titleFromPid('preferences')
  }
}
</script>

<style scoped>

.page {
  margin: 2em 5%;
}

</style>
