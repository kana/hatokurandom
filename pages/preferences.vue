<template>
  <div class="page">
    <block-title>
      使用するカードセット
    </block-title>
    <omni-list>
      <omni-list-item v-for="expansion in configurableExpansions" :key="expansion.eid">
        <div class="item-expansion">
          <div class="label-expansion">
            <template v-if="expansion.name === 'フェアリーガーデン'">
              <span class="word">フェアリー</span>
              <span class="word">ガーデン</span>
            </template>
            <template v-else>
              {{ expansion.name }}
            </template>
          </div>
          <segmented-button-group
            v-model="options[expansion.optionKey]"
            :choices="choices"
            class="segmented-button-group"
          />
        </div>
      </omni-list-item>
    </omni-list>

    <block-title>
      禁止カード
    </block-title>
    <omni-list>
      <omni-list-item v-for="name in bannedCardNames" :key="name">
        {{ name }}
      </omni-list-item>
      <link-list-item title="禁止カードを編集する…" path="/preferences/banned-cards" />
    </omni-list>

    <block-title>
      偏り具合の調整
    </block-title>

    <preference-switch v-model="excludeBannedCardsForAll" title="公式推奨バランスにする">
      <template v-slot:note>
        以下のカードは出現しません:
        <span class="card-name">埋もれた財宝</span>
        <span class="card-name">買収工作</span>
        <span class="card-name">魅了術の魔女</span>
      </template>
    </preference-switch>

    <preference-switch v-model="excludeBannedCardsForFairy" title="フェアリーガーデンと併用非推奨のカードを除外する">
      <template v-slot:note>
        フェアリーガーデンのカードと以下のカードは同時に出現しません:
        全ての防衛カード、および
        <span class="card-name">破城槌</span>
        <span class="card-name">埋もれた財宝</span>
        <span class="card-name">星詠みの魔女</span>
        <span class="card-name">シノビ</span>
        <span class="card-name">魅了術の魔女</span>
        <span class="card-name">歩兵大隊</span>
        <span class="card-name">近衛騎士団</span>
        <span class="card-name">弓兵隊</span>
        <span class="card-name">サムライ</span>
      </template>
    </preference-switch>

    <preference-switch v-model="excludeBannedCardsForStar" title="星天前路と併用非推奨のカードを除外する">
      <template v-slot:note>
        星天前路のカードと以下のカードは同時に出現しません:
        「フェアリーガーデンと併用非推奨のカード」一式、および
        <span class="card-name">割り符</span>
      </template>
    </preference-switch>

    <preference-switch v-model="includeAllCosts" title="各コスト帯のカードを含める">
      <template v-slot:note>
        各コスト帯のカードを1枚以上含めるようにします。
        ただし6コスト以上のカードは5コスト帯として扱います。
      </template>
    </preference-switch>

    <preference-switch v-model="includeLink2" title="リンク2を適宜含める">
      <template v-slot:note>
        サプライにリンク0のカードが含まれる場合、
        リンク2のカードを1枚は含めるようにします。
      </template>
    </preference-switch>
  </div>
</template>

<script>
import BlockTitle from '~/components/BlockTitle'
import LinkListItem from '~/components/LinkListItem'
import OmniList from '~/components/OmniList'
import OmniListItem from '~/components/OmniListItem'
import PreferenceSwitch from '~/components/PreferenceSwitch'
import SegmentedButtonGroup from '~/components/SegmentedButtonGroup'
import { EXPANSIONS, cardFromCid, titleFromPid } from '~/lib/constants'

function mapOptionStore (keys) {
  const computed = {}

  for (const key of keys) {
    computed[key] = {
      get () {
        return this.$store.state.options[key]
      },
      set (value) {
        this.$store.dispatch('options/update', { key, value })
      }
    }
  }

  return computed
}

export default {
  components: {
    BlockTitle,
    LinkListItem,
    OmniList,
    OmniListItem,
    PreferenceSwitch,
    SegmentedButtonGroup
  },
  head: {
    title: titleFromPid('preferences')
  },
  computed: {
    bannedCardNames () {
      return this.excludeBannedCardsByUser.map(cid => cardFromCid(cid).name)
    },
    choices () {
      return [
        { label: '必ず使う', value: 'must' },
        { label: '使う', value: 'may' },
        { label: '使わない', value: 'must_not' }
      ]
    },
    configurableExpansions () {
      return EXPANSIONS.filter(expansion => expansion.optionKey !== undefined)
    },
    options () {
      return this
    },
    ...mapOptionStore([
      'excludeBannedCardsByUser',
      'excludeBannedCardsForAll',
      'excludeBannedCardsForFairy',
      'excludeBannedCardsForStar',
      'includeAllCosts',
      'includeExpansionBasic',
      'includeExpansionFairy',
      'includeExpansionFareast',
      'includeExpansionNorthern',
      'includeExpansionSix',
      'includeExpansionStar',
      'includeLink2'
    ])
  }
}
</script>

<style scoped>

.page {
  margin: 2em 0;
}

.item-expansion {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.label-expansion .word {
  display: inline-block;
  white-space: nowrap;
}

/* Narrower than iPhone 8 Plus */
@media (max-width: 413px) {
  .segmented-button-group {
    font-size: 90%;
  }
}

.card-name {
  display: inline-block;
}

.card-name:before {
  content: '《';
}

.card-name:after {
  content: '》';
}

</style>
