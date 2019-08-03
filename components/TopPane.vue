<template>
  <div class="top-pane">
    <nuxt-link v-if="toParent" :to="toParent" class="back-to-parent-button">
      <span><font-awesome-icon icon="chevron-left" size="lg" /></span>
    </nuxt-link>
    <div class="title">
      {{ title }}
    </div>
    <a v-if="shareable" :href="shareUrl" class="share-button" target="_blank">
      <span><font-awesome-icon icon="share-square" /></span>
    </a>
  </div>
</template>

<script>
import { isCardListPid, pathFromPid, parentPidFromPid, pidFromPath, sortXcards, titleFromPid, xcardsFromPid } from '~/lib/constants'

export default {
  name: 'TopPane',
  computed: {
    locationOrigin () {
      return 'https://hatokurandom.whileimautomaton.net'
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
      // TODO: Remove # when this new version is released.
      const permalink = `${this.locationOrigin}/#${this.sharePid}`
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
    },
    toParent () {
      const parentPid = parentPidFromPid(this.pid)
      return parentPid !== undefined ? pathFromPid(parentPid) : undefined
    }
  }
}
</script>

<style scoped>

.top-pane {
  align-items: center;
  background: var(--header-background-color);
  border-bottom: 1px solid var(--header-border-color);
  color: var(--header-text-color);
  display: flex;
  height: var(--top-pane-height);
  justify-content: center;
}

.title {
  font-weight: bolder;
  text-align: center;
  width: 100%;
}

.back-to-parent-button {
  align-content: center;
  color: var(--header-back-button-color);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: none;
  height: calc(1em + 2ex);
  justify-content: center;
  margin-left: calc(1em - 1ex);
  margin-right: calc(-2em - 1ex);
  text-align: center;
  width: calc(1em + 2ex);
}

.share-button {
  align-content: center;
  color: var(--header-text-color);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: none;
  height: calc(1em + 2ex);
  justify-content: center;
  margin-left: calc(-2em - 1ex);
  margin-right: calc(1em - 1ex);
  text-align: center;
  width: calc(1em + 2ex);
}

</style>
