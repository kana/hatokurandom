<template>
  <div class="top-pane">
    <nuxt-link v-if="toParent" :to="toParent" class="back-to-parent-button">
      <span><font-awesome-icon icon="chevron-left" size="lg" /></span>
    </nuxt-link>
    <div class="title">
      <div class="text">
        {{ title }}
      </div>
    </div>
    <a
      v-if="shareablePage"
      :href="shareUrl"
      :class="{ disabled: !shareableSupply }"
      class="share-button"
      target="_blank"
      @click="share"
    >
      <span><font-awesome-icon icon="share-square" /></span>
    </a>
  </div>
</template>

<script>
import { isCardListPid, pathFromPid, parentPidFromPid, pidFromPath, sidFromPid, sortXcards, titleFromPid, xcardsFromPid } from '~/lib/constants'

export default {
  name: 'TopPane',
  computed: {
    locationOrigin () {
      return 'https://hatokurandom.whileimautomaton.net'
    },
    pid () {
      return pidFromPath(this.$route.path)
    },
    shareablePage () {
      return isCardListPid(this.pid)
    },
    shareableSupply () {
      return this.shareablePage && this.sharePid
    },
    sharePid () {
      return this.$store.state.supply.pid
    },
    shareUrl () {
      if (!this.shareableSupply) {
        return null
      }

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
    },
    toParent () {
      const parentPid = parentPidFromPid(this.pid)
      return parentPid !== undefined ? pathFromPid(parentPid) : undefined
    }
  },
  methods: {
    share (e) {
      if (!this.shareableSupply) {
        e.preventDefault()
        return
      }

      this.$store.dispatch('log/push', {
        sid: sidFromPid(this.sharePid),
        at: Date.now()
      })
      // Propagate click event to let the browser open shareUrl.
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
  width: 100%;
  text-align: center;
}

.text {
  box-sizing: border-box;
  display: inline-block;
  font-weight: bolder;
  max-width: 100%;
  overflow: hidden;
  padding: 0 calc(2em + 1ex);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  position: relative;
  text-align: center;
  width: calc(1em + 2ex);
  z-index: 1;
}

.share-button {
  align-content: center;
  border-radius: 0.25ex;
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
  transition: background 0.2s, color 0.2s;
  width: calc(1em + 2ex);
}

.share-button.disabled {
  color: var(--item-value-color);
  cursor: default;
  user-select: none;
}

@media (hover) {
  .share-button:hover {
    background: var(--toast-background-color);
  }

  .share-button.disabled:hover {
    background: transparent;
  }
}

</style>
