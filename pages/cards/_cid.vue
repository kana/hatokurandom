<template>
  <page-container>
    <table>
      <tbody>
        <tr>
          <th>名前</th>
          <td>{{ card.name }}</td>
        </tr>
        <tr>
          <th>コスト</th>
          <td>{{ card.cost }}</td>
        </tr>
        <tr>
          <th>タイプ</th>
          <td>{{ card.types.join('、') }}</td>
        </tr>
        <tr v-if="card.subtype !== undefined">
          <th>サブタイプ</th>
          <td>{{ card.subtype }}</td>
        </tr>
        <tr v-if="card.link !== undefined">
          <th>リンク</th>
          <td>{{ card.link }}</td>
        </tr>
        <tr>
          <th>レアリティ</th>
          <td>{{ rarity }}</td>
        </tr>
        <tr>
          <th>収録セット</th>
          <td>{{ expansionName }}</td>
        </tr>
        <tr>
          <th>テキスト</th>
          <td class="cardText">
            {{/* eslint-disable vue/no-v-html */}}
            <div
              v-for="html in cardTextHtmls"
              :key="html"
              v-html="html"
            />
            {{/* eslint-enable vue/no-v-html */}}
          </td>
        </tr>
      </tbody>
    </table>
  </page-container>
</template>

<script>
import PageContainer from '~/components/PageContainer'
import { cardFromCid, cardTextHtmlsFromCid, expansionFromEid, pidFromPath, ogpMetaFromPid, titleTagValueFromPid, transition } from '~/lib/utils'

export default {
  components: {
    PageContainer
  },
  validate ({ params }) {
    return cardFromCid(parseInt(params.cid, 10)) !== undefined
  },
  transition,
  data () {
    return {
      cardTextHtmls: ['...']
    }
  },
  head () {
    const pid = pidFromPath(this.$route.path)
    return {
      title: titleTagValueFromPid(pid),
      meta: ogpMetaFromPid(pid)
    }
  },
  computed: {
    card () {
      return cardFromCid(this.cid)
    },
    cid () {
      return parseInt(this.$route.params.cid, 10)
    },
    expansionName () {
      return expansionFromEid(this.card.eid).name
    },
    rarity () {
      return {
        B: 'ベーシック',
        C: 'コモン',
        R: 'レア'
      }[this.card.rarity] || '?'
    }
  },
  async mounted () {
    this.cardTextHtmls = await cardTextHtmlsFromCid(this.cid)
  }
}
</script>

<style scoped>

.cardText >>> .coin {
  background: #CCCC99;
  border-radius: 1em;
  display: inline-block;
  height: 1em;
  min-width: 1em;
  text-align: center;
}

</style>
