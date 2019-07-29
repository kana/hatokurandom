<template>
  <div class="page">
    <block-title>
      使用するカードセット
    </block-title>
    <ul>
      <li v-for="expansion in configurableExpansions" :key="expansion.eid">
        <div>{{ expansion.name }}</div>
        <div :id="expansion.optionKey">
          <label><input :name="expansion.optionKey" type="radio"> 必須</label>
          <label><input :name="expansion.optionKey" type="radio"> 使用</label>
          <label><input :name="expansion.optionKey" type="radio"> 禁止</label>
        </div>
      </li>
    </ul>

    <block-title>
      禁止カード
    </block-title>
    <div>
      <div id="must_exclude_cards">
        サムライ, 割り符
      </div>
      <div>
        ＞
      </div>
    </div>

    <block-title>
      偏り具合の調整
    </block-title>
    <ul>
      <li>
        <label>
          <input v-model="exclude_banned_cards" name="exclude_banned_cards" type="checkbox">
          <div class="title">
            公式推奨バランスにする
          </div>
          <div class="description">
            以下のカードは出現しません:
            <span class="card-name">埋もれた財宝</span>
            <span class="card-name">買収工作</span>
            <span class="card-name">魅了術の魔女</span>
          </div>
        </label>
      </li>
      <li>
        <label>
          <input name="exclude_banned_cards_for_fairy_garden" type="checkbox" checked>
          <div class="title">
            フェアリーガーデンと併用非推奨のカードを除外する
          </div>
          <div class="description">
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
          </div>
        </label>
      </li>
      <li>
        <label>
          <input name="exclude_banned_cards_for_trajectory_of_the_star" type="checkbox" checked>
          <div class="title">
            星天前路と併用非推奨のカードを除外する
          </div>
          <div class="description">
            星天前路のカードと以下のカードは同時に出現しません:
            「フェアリーガーデンと併用非推奨のカード」一式、および
            <span class="card-name">割り符</span>
          </div>
        </label>
      </li>
      <li>
        <label>
          <input name="include_all_costs" type="checkbox">
          <div class="title">
            各コスト帯のカードを含める
          </div>
          <div class="description">
            各コスト帯のカードを1枚以上含めるようにします。
            ただし6コスト以上のカードは5コスト帯として扱います。
          </div>
        </label>
      </li>
      <li>
        <label>
          <input name="include_link_2" type="checkbox">
          <div class="title">
            リンク2を適宜含める
          </div>
          <div class="description">
            サプライにリンク0のカードが含まれる場合、
            リンク2のカードを1枚は含めるようにします。
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import BlockTitle from '~/components/BlockTitle'
import { EXPANSIONS, titleFromPid } from '~/lib/constants'

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
    BlockTitle
  },
  head: {
    title: titleFromPid('preferences')
  },
  computed: {
    configurableExpansions () {
      return EXPANSIONS.filter(expansion => expansion.optionKey !== undefined)
    },
    ...mapOptionStore([
      'exclude_banned_cards',
      'exclude_banned_cards_for_fairy_garden',
      'exclude_banned_cards_for_trajectory_of_the_star',
      'include_all_costs',
      'include_basic',
      'include_fairy',
      'include_fareast',
      'include_link_2',
      'include_northern',
      'include_six',
      'include_star',
      'must_exclude_cards'
    ])
  }
}
</script>

<style scoped>

.page {
  margin: 2em 5%;
}

</style>
