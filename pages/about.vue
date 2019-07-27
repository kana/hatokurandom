<template>
  <div class="page">
    <p>
      このアプリは
      <a href="http://flipflops.jp/" target="_blank">FLIPFLOPs</a>
      様製作のデッキ成長型カードゲーム
      <a href="http://hatokura.flipflops.jp/" target="_blank">Heart of Crown</a>
      用のサプライを選ぶためのツールです。
    </p>
    <p>
      <a href="http://hatokura.flipflops.jp/rule" target="_blank">ルールブック</a>
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
      <a href="https://www.google.com/search?q=%E3%83%8F%E3%83%BC%E3%83%88%E3%82%AA%E3%83%96%E3%82%AF%E3%83%A9%E3%82%A6%E3%83%B3%20%E3%83%A9%E3%83%B3%E3%83%80%E3%83%A0%20%E9%81%B8%E6%8A%9E" target="_blank">既存の実装</a>
      がいくつも存在しますが、
      <a href="https://twitter.com/kana1" target="_blank">作者</a>
      が
      <a href="https://nuxtjs.org/" target="_blank">普段使用していない技術</a>
      を使っての習作と私的な需要を満たすことを兼ねて作成しています。
    </p>
    <ul>
      <li>
        <a href="https://github.com/kana/hatokurandom" target="_blank">ソースコード</a>
      </li>
      <li>
        <a href="https://twitter.com/intent/tweet?text=@kana1+&amp;hashtags=hatokurandom" target="_blank">ご意見・ご感想</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { titleFromPid } from '~/lib/constants'

export default {
  head: {
    title: titleFromPid('about')
  }
}
</script>

<style scoped>
</style>
