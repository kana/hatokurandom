<template>
  <div class="page">
    <p>
      このアプリは
      <external-link href="http://flipflops.jp/" label="FLIPFLOPs" />
      様製作のデッキ成長型カードゲーム
      <external-link href="http://hatokura.flipflops.jp/" label="Heart of Crown" />
      用のサプライを選ぶためのツールです。
    </p>
    <p>
      <external-link href="http://hatokura.flipflops.jp/rule" label="ルールブック" />
      には初めてプレイする際に最適な
      <nuxt-link to="supplies:basic">
        推奨サプライ
      </nuxt-link>
      が記載されていますが、ある程度ゲームに慣れてくると
      <nuxt-link to="supplies:random">
        ランダム選択でサプライを決める
      </nuxt-link>
      ようになります。
      ところがコモンカード10種類をランダムに選択するのは案外大変です。
      このツールが快適なゲームプレイの一助となれば幸いです。
    </p>
    <p>
      この手のツールは
      <external-link href="https://www.google.com/search?q=%E3%83%8F%E3%83%BC%E3%83%88%E3%82%AA%E3%83%96%E3%82%AF%E3%83%A9%E3%82%A6%E3%83%B3%20%E3%83%A9%E3%83%B3%E3%83%80%E3%83%A0%20%E9%81%B8%E6%8A%9E" label="既存の実装" />
      がいくつも存在しますが、
      <external-link href="https://twitter.com/kana1" label="作者" />
      が
      <external-link href="https://nuxtjs.org/" label="普段使用していない技術" />
      を使っての習作と私的な需要を満たすことを兼ねて作成しています。
    </p>
    <ul>
      <li>
        <external-link href="https://github.com/kana/hatokurandom" label="ソースコード" />
      </li>
      <li>
        <external-link href="https://twitter.com/intent/tweet?text=@kana1+&amp;hashtags=hatokurandom" label="ご意見・ご感想" />
      </li>
      <li>バージョン {{ version }}</li>
    </ul>
  </div>
</template>

<script>
import ExternalLink from '~/components/ExternalLink'
import { titleFromPid } from '~/lib/constants'

export default {
  components: {
    ExternalLink
  },
  head: {
    title: titleFromPid('about')
  },
  computed: {
    version () {
      return process.env.version
    }
  }
}
</script>

<style scoped>

.page {
  margin: 2em 5%;
}

p {
  margin: 1.2em 0;
}

</style>
