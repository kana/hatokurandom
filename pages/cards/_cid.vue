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
          <td>XXX</td>
        </tr>
      </tbody>
    </table>
  </page-container>
</template>

<script>
import PageContainer from '~/components/PageContainer'
import { cardFromCid, expansionFromEid, pidFromPath, ogpMetaFromPid, titleTagValueFromPid, transition } from '~/lib/utils'

export default {
  components: {
    PageContainer
  },
  validate ({ params }) {
    return cardFromCid(parseInt(params.cid, 10)) !== undefined
  },
  transition,
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
  }
}
</script>

<style scoped>
</style>
