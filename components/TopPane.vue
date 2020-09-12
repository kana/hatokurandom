<template>
  <div class="top-pane">
    <fade-in-out>
      <transitioned-link v-if="toBack" :path="toBack" class="back-to-parent-button">
        <div class="back-to-parent-button-inner">
          <font-awesome-icon icon="chevron-left" size="lg" />
        </div>
      </transitioned-link>
    </fade-in-out>
    <div class="title">
      <transition :name="titleTransition">
        <div :key="title" class="text">
          <span>{{ title }}</span>
        </div>
      </transition>
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
import TransitionedLink from '~/components/TransitionedLink'
import { isCardListPid, isForwardTransitionByPids, permalinkFromPid, pidFromPath, sidFromPid, sortXcards, titleFromPid, xcardsFromPid } from '~/lib/utils'

export default {
  name: 'TopPane',
  components: {
    FadeInOut,
    TransitionedLink
  },
  data () {
    return {
      titleTransitionBase: 'shift-forward'
    }
  },
  computed: {
    isReferencePage () {
      return this.sharePid.startsWith('reference:')
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

      const permalink = permalinkFromPid(this.sharePid)
      const usedCardNames = sortXcards(xcardsFromPid(this.sharePid))
        .filter(xcard => !xcard.dropped)
        .map(xcard => xcard.name)
      const baseMessage = this.isReferencePage
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
    titleTransition () {
      const byTap = this.$route.params.transition
      return byTap ? this.titleTransitionBase : 'none'
    },
    toBack () {
      return this.$store.getters['history/backPath'](this.pid)
    }
  },
  watch: {
    pid (newPid, oldPid) {
      this.titleTransitionBase = isForwardTransitionByPids(newPid, oldPid)
        ? 'shift-forward'
        : 'shift-backward'
    }
  },
  methods: {
    share (e) {
      if (!this.shareableSupply) {
        e.preventDefault()
        return
      }

      if (!this.isReferencePage) {
        this.$store.dispatch('log/append', {
          sid: sidFromPid(this.sharePid),
          at: Date.now()
        })
      }

      this.$ga.event({
        eventCategory: 'supply',
        eventAction: 'share',
        eventLabel: this.sharePid
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
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
}

.title:before,
.title:after {
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  top: 0;
  width: calc(2em + 1ex);
  z-index: 1;
}

.title:before {
  background: linear-gradient(
    to right,
    var(--header-background-color) 0,
    var(--header-background-color) 1.5em,
    var(--header-background-color-transparent) 100%
  );
  left: 0;
}

.title:after {
  background: linear-gradient(
    to left,
    var(--header-background-color) 0,
    var(--header-background-color) 1.5em,
    var(--header-background-color-transparent) 100%
  );
  right: 0;
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

.shift-forward-enter-active,
.shift-forward-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}

.shift-forward-enter-active {
  left: 50%;
  position: absolute;
}

.shift-forward-enter {
  opacity: 0;
  transform: translateX(calc(-50% + 100vw));
}
.shift-forward-enter-to {
  opacity: 1;
  transform: translateX(-50%);
}

.shift-forward-leave {
  opacity: 1;
  transform: translateX(0);
}
.shift-forward-leave-to {
  opacity: 0;
  transform: translateX(-100vw);
}

.shift-backward-enter-active,
.shift-backward-leave-active {
  transition: opacity 0.256s, transform 0.256s;
}

.shift-backward-enter-active {
  left: 50%;
  position: absolute;
}

.shift-backward-enter {
  opacity: 0;
  transform: translateX(calc(-50% - 100vw));
}
.shift-backward-enter-to {
  opacity: 1;
  transform: translateX(-50%);
}

.shift-backward-leave {
  opacity: 1;
  transform: translateX(0);
}
.shift-backward-leave-to {
  opacity: 0;
  transform: translateX(100vw);
}

.back-to-parent-button {
  flex: none;
  z-index: 2;
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
  z-index: 2;
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
