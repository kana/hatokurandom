<template>
  <div class="top-pane">
    <fade-in-out>
      <nuxt-link v-if="toParent" :to="toParent" class="back-to-parent-button">
        <div class="back-to-parent-button-inner">
          <font-awesome-icon icon="chevron-left" size="lg" />
        </div>
      </nuxt-link>
    </fade-in-out>
    <div class="title">
      <div class="text">
        {{ title }}
      </div>
    </div>
    <fade-in-out>
      <a
        v-if="shareablePage"
        :href="shareUrl"
        :class="{ disabled: !shareableSupply }"
        class="share-button"
        target="_blank"
        @click="share"
      >
        <div class="share-button-inner">
          <font-awesome-icon icon="share-square" />
        </div>
      </a>
    </fade-in-out>
  </div>
</template>

<script>
import FadeInOut from '~/components/FadeInOut'
import { isCardListPid, pathFromPid, parentPidFromPid, permalinkFromPid, pidFromPath, sidFromPid, sortXcards, titleFromPid, xcardsFromPid } from '~/lib/constants'

export default {
  name: 'TopPane',
  components: {
    FadeInOut
  },
  computed: {
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

      const permalink = permalinkFromPid(this.sharePid)
      const isReferencePage = this.sharePid.startsWith('reference:')
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

      this.$store.dispatch('log/append', {
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
  flex: none;
}

.back-to-parent-button-inner {
  align-items: center;
  border-radius: 0.25ex;
  color: var(--header-back-button-color);
  cursor: pointer;
  display: flex;
  height: 2em;
  justify-content: center;
  margin-left: 0.5em;
  margin-right: -2.5em;
  position: relative;
  transition: background 0.2s;
  width: 2em;
  z-index: 1;
}

@media (hover) {
  .back-to-parent-button-inner:hover {
    background: var(--toast-background-color);
  }
}

.share-button {
  flex: none;
}

.share-button-inner {
  align-items: center;
  border-radius: 0.25ex;
  color: var(--header-text-color);
  cursor: pointer;
  display: flex;
  height: 2em;
  justify-content: center;
  margin-left: -2.5em;
  margin-right: 0.5em;
  transition: background 0.2s, color 0.2s;
  width: 2em;
}

.disabled .share-button-inner {
  color: var(--item-value-color);
  cursor: default;
  user-select: none;
}

@media (hover) {
  .share-button-inner:hover {
    background: var(--toast-background-color);
  }

  .disabled .share-button-inner:hover {
    background: transparent;
  }
}

</style>
