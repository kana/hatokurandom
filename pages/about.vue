<template>
  <page-container>
    <div class="introduction">
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
        <transitioned-link path="/supplies:basic">
          推奨サプライ
        </transitioned-link>
        が記載されていますが、ある程度ゲームに慣れてくると
        <transitioned-link path="/supplies:random">
          ランダム選択でサプライを決める
        </transitioned-link>
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
    </div>

    <omni-list>
      <omni-list-item>
        <external-link href="https://github.com/kana/hatokurandom" label="ソースコード" />
      </omni-list-item>
      <omni-list-item>
        <external-link :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent('@kana1 ハトクランダムについて:')}`" label="質問・バグ報告・要望等" />
      </omni-list-item>
      <omni-list-item class="version">
        <span class="label">バージョン</span>
        <span class="value">{{ version }}</span>
      </omni-list-item>
      <client-only>
        <link-button-list-item v-if="isRunningInStandaloneMode" @click="reload">
          最新バージョンに更新する
        </link-button-list-item>
      </client-only>
    </omni-list>
    <div v-if="previousVersion" class="version-note">
      <div v-if="previousVersion === version" class="text">
        最新バージョンです。
      </div>
      <div v-else class="text">
        最新バージョンに更新しました。
        <br>更新前のバージョン: {{ previousVersion }}
      </div>
    </div>
  </page-container>
</template>

<script>
import ExternalLink from '~/components/ExternalLink'
import LinkButtonListItem from '~/components/LinkButtonListItem'
import OmniList from '~/components/OmniList'
import OmniListItem from '~/components/OmniListItem'
import PageContainer from '~/components/PageContainer'
import TransitionedLink from '~/components/TransitionedLink'
import { ogpMetaFromPid, titleTagValueFromPid, transition } from '~/lib/utils'

export default {
  components: {
    ExternalLink,
    LinkButtonListItem,
    OmniList,
    OmniListItem,
    PageContainer,
    TransitionedLink
  },
  computed: {
    isRunningInStandaloneMode () {
      return process.browser && navigator.standalone
    },
    previousVersion () {
      return this.$route.query.updateFrom || undefined
    },
    version () {
      return process.env.version
    }
  },
  methods: {
    reload () {
      location.href = `${this.$route.path}?updateFrom=${this.version}`
    }
  },
  head: {
    title: titleTagValueFromPid('about'),
    meta: ogpMetaFromPid('about')
  },
  transition
}
</script>

<style scoped>

.introduction {
  color: var(--toast-text-color);
  margin: 0 5%;
}

p {
  margin: 1.2em 0;
}

p:first-child {
  margin-top: 0;
}

.version .label {
  width: 100%;
}

.version .value {
  color: var(--item-value-color);
  flex: none;
  white-space: nowrap;
}

.version-note {
  margin: 0.5em 1em 0;
}

.text {
  color: var(--item-value-color);
  font-size: 80%;
}

</style>
