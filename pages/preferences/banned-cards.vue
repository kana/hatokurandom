<template>
  <page-container>
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
      <omni-list-item v-if="bannedXcards.length === 0" class="divider">
        未設定
      </omni-list-item>
    </omni-list>

    <template v-if="unbannedXcards.length > 0">
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
    </template>
  </page-container>
</template>

<script>
import BlockTitle from '~/components/BlockTitle'
import CardListItem from '~/components/CardListItem'
import OmniList from '~/components/OmniList'
import OmniListItem from '~/components/OmniListItem'
import PageContainer from '~/components/PageContainer'
import { COMMON_CARDS, ogpMetaFromPid, sortXcards, titleFromPid, transition } from '~/lib/utils'

export default {
  components: {
    BlockTitle,
    CardListItem,
    OmniList,
    OmniListItem,
    PageContainer
  },
  head: {
    title: titleFromPid('preferences/banned-cards'),
    meta: ogpMetaFromPid('preferences/banned-cards')
  },
  transition,
  data () {
    const bannedCidSet = new Set(this.$store.state.options.excludeBannedCardsByUser)
    return {
      xcards: COMMON_CARDS.map(card => ({
        ...card,
        dropped: bannedCidSet.has(card.cid)
      }))
    }
  },
  computed: {
    bannedXcards () {
      return sortXcards(this.xcards.filter(xcard => xcard.dropped))
    },
    unbannedXcards () {
      return sortXcards(this.xcards.filter(xcard => !xcard.dropped))
    }
  },
  watch: {
    xcards: {
      handler () {
        this.onUpdateXcards()
      },
      deep: true
    }
  },
  methods: {
    onUpdateXcards () {
      this.$store.dispatch('options/update', {
        key: 'excludeBannedCardsByUser',
        value: this.xcards.filter(xcard => xcard.dropped).map(xcard => xcard.cid)
      })
    }
  }
}
</script>

<style scoped>

.divider {
  color: var(--item-value-color);
}

</style>
