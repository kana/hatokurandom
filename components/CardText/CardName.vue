<template>
  <transitioned-link :path="path" class="card-name">
    <slot />
  </transitioned-link>
</template>

<script>
import TransitionedLink from '~/components/TransitionedLink'
import { cidFromCardName } from '~/lib/utils'

export default {
  components: {
    TransitionedLink
  },
  computed: {
    cardName () {
      return this.$slots.default[0].text
    },
    path () {
      return `/cards/${cidFromCardName(this.cardName)}`
    }
  }
}
</script>

<style scoped>

.card-name::before {
  content: "「";
}

.card-name::after {
  content: "」";
}

</style>
