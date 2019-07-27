<template>
  <div class="top-pane">
    <div v-if="parentPid" class="back-to-parent-button" @click="backToParent">
      [&lt;]
    </div>
    <div class="title">
      {{ title }}
    </div>
    <a v-if="shareable" :href="shareUrl" class="share-button" target="_blank">
      [^]
    </a>
  </div>
</template>

<script>
import { isCardListPid, parentPidFromPid, pidFromPath, sortXcards, titleFromPid, xcardsFromPid } from '~/lib/constants'

export default {
  name: 'TopPane',
  computed: {
    locationOrigin () {
      return 'https://hatokurandom.whileimautomaton.net'
    },
    parentPid () {
      return parentPidFromPid(this.pid)
    },
    pid () {
      return pidFromPath(this.$route.path)
    },
    shareable () {
      return isCardListPid(this.pid) && this.sharePid
    },
    sharePid () {
      return this.$store.state.supply.pid
    },
    shareUrl () {
      const permalink = `${this.locationOrigin}/${this.sharePid}`
      const isReferencePage = /^reference:/.test(this.sharePid)
      const usedCardNames = sortXcards(xcardsFromPid(this.sharePid))
        .filter(xcard => !xcard.dropped)
        .map(xcard => xcard.name)
      const baseMessage = isReferencePage
        ? `ハトクラの${this.title}`
        : `ハトクラなう。今回のサプライ: ${usedCardNames.join(', ')}`
      const optionSharingTool = 'web_intent' // TODO
      const ss = optionSharingTool === 'web_intent' ? [
        'https://twitter.com/intent/tweet',
        '?url=', encodeURIComponent(permalink),
        '&text=', encodeURIComponent(`${baseMessage} #hatokura`),
        '&related=', encodeURIComponent('HeartofCrown')
      ] : [
        'twitter://post?message=',
        encodeURIComponent(`${baseMessage} #hatokura ${permalink}`)
      ]
      return ss.join('')
    },
    title () {
      return titleFromPid(this.pid)
    }
  },
  methods: {
    backToParent () {
      this.$router.push(this.parentPid)
    }
  }
}
</script>

<style scoped>

.top-pane {
  align-items: center;
  background: #eee;
  border-bottom: 1px solid #ddd;
  display: flex;
  height: 3em;
  justify-content: center;
}

.title {
  font-size: 144%;
  text-align: center;
  width: 100%;
}

.back-to-parent-button {
  cursor: pointer;
  flex: none;
  height: 1em;
  margin-left: 1em;
  margin-right: -2em;
  width: 1em;
}

.share-button {
  cursor: pointer;
  flex: none;
  height: 1em;
  margin-left: -2em;
  margin-right: 1em;
  width: 1em;
}

</style>
