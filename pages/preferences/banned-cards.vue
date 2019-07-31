<template>
  <div class="page">
    <block-title>
      禁止カード
    </block-title>

    <omni-list>
      <card-list-item
        v-for="xcard in bannedXcards"
        :key="xcard.cid"
        :xcard="xcard"
        editable
      />
    </omni-list>

    <block-title>
      使用するカード
    </block-title>

    <omni-list>
      <card-list-item
        v-for="xcard in unbannedXcards"
        :key="xcard.cid"
        :xcard="xcard"
        editable
      />
    </omni-list>
  </div>
</template>

<script>
import BlockTitle from '~/components/BlockTitle'
import CardListItem from '~/components/CardListItem'
import OmniList from '~/components/OmniList'
import { cardFromCid, sortXcards, titleFromPid } from '~/lib/constants'

export default {
  components: {
    BlockTitle,
    CardListItem,
    OmniList
  },
  head: {
    title: titleFromPid('preferences/banned-cards')
  },
  computed: {
    bannedXcards () {
      return sortXcards([11, 22, 33].map(cid => ({
        ...cardFromCid(cid),
        dropped: false
      })))
    },
    unbannedXcards () {
      return sortXcards([3, 6, 8, 9, 39, 48, 55].map(cid => ({
        ...cardFromCid(cid),
        dropped: true
      })))
    }
  }
}
</script>

<style scoped>

.page {
  margin: 2em 0;
}

</style>
