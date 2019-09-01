<template>
  <omni-list-item
    v-touch:start="onTouchStart"
    v-touch:end="onTouchEnd"
    :component="editable ? 'label' : 'div'"
    :clickable="editable"
    :class="{ dropped: xcard.dropped, [gesture]: true }"
    class="line"
    @touchmove.native="onTouchMove"
  >
    <div
      :style="{ transform: `translateX(-${dx}px)` }"
      class="main"
    >
      <template v-if="editable">
        <input v-show="false" v-model="xcard.dropped" type="checkbox">
        <font-awesome-icon class="check" icon="check" size="xs" />
      </template>
      <span class="cost">{{ dx }} {{ xcard.cost }}</span>
      <span :data-names="typeNamesString" class="type" />
      <span class="name">{{ xcard.name }}</span>
      <span v-if="xcard.subtype" class="subtype">（{{ xcard.subtype }}）</span>
      <span :data-symbol="expansionSymbol" class="expansion">{{ expansionSymbol }}</span>
    </div>
    <span
      v-if="random"
      :style="{ width: `${dx}px` }"
      class="change-this-card"
      @transitionend="onTransitionEnd"
    >
      <span class="icon-container">
        <font-awesome-icon :class="{ active: dx > 100 }" class="icon" icon="sync-alt" size="sm" />
      </span>
    </span>
  </omni-list-item>
</template>

<script>
import OmniListItem from '~/components/OmniListItem'
import { expansionFromEid } from '~/lib/utils'

export default {
  name: 'CardListItem',
  components: {
    OmniListItem
  },
  props: {
    editable: {
      type: Boolean,
      required: true
    },
    random: {
      type: Boolean,
      default: false
    },
    xcard: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dx: 0,
      gesture: 'start'
    }
  },
  computed: {
    expansionSymbol () {
      return expansionFromEid(this.xcard.eid).symbol
    },
    typeNamesString () {
      return this.xcard.types.join(' ')
    }
  },
  methods: {
    onTouchStart () {
      // vue2-touch-events updates e.currentTarget.$$touchObj.
      this.dx = 0
      this.gesture = 'start'
    },
    onTouchMove (e) {
      if (this.gesture === 'ignore') {
        return
      }

      const t = e.currentTarget.$$touchObj
      if (t === undefined) {
        // Sometimes $$touchObj is undefined if user tries
        // swiping with two or more fingers.
        return
      }
      if (t.currentX === 0 && t.currentY === 0) {
        // For some reason these values are zeros at the start of a gesture.
        return
      }

      const dx = t.currentX - t.startX
      const dy = t.currentY - t.startY

      if (this.gesture === 'start') {
        if (dx > 0 || Math.abs(dx) < Math.abs(dy)) {
          // Swipe to right/up/down is not a right gesture.
          this.gesture = 'ignore'
          return
        }
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
          // Once user starts a right gesture, do not ignore the following
          // touchmove events until touchend to update UI.
          this.gesture = 'doing'
        }
      }

      // Prevent vertical scroll if user seems to be doing a gesture.
      e.preventDefault()

      this.dx = Math.max(0, -dx)
    },
    onTouchEnd () {
      const width = window.innerWidth
      if (this.dx >= width / 3) {
        this.gesture = 'recognized'
        this.dx = width
      } else {
        this.gesture = 'canceled'
        this.dx = 0
      }
    },
    onTransitionEnd () {
      if (this.gesture === 'recognized') {
        this.$emit('change-this-card')
      }
    }
  }
}
</script>

<style scoped>

.line {
  position: relative;
}

.main {
  align-items: center;
  display: flex;
  transition: transform 0.4s;
  width: 100%;
}

.line.start .main,
.line.doing .main {
  transition: none;
}

.line.recognized .main {
  transition-duration: 0.2s;
}

.check {
  color: var(--link-text-color);
  margin-right: 1em;
}

.line.dropped .check {
  visibility: hidden;
}

.cost {
  flex: none;
  font-weight: bolder;
}

.type {
  background: #f0f;
  display: inline-block;
  flex: none;
  height: 0.8em;
  margin-left: 0.5ex;
  width: 0.8em;

  --trouble-color: #636;
  --action-color: #999;
  --defense-color: #339;
  --attack-color: #c66;
  --land-color: #963;
  --authority-color: #696;
  --princess-color: #cc3;
  --support-color: #e73;
  --unknown-color: #ddd;
}

.type[data-names~='災い'] {
  background: var(--trouble-color);
}
.type[data-names~='行動'] {
  background: var(--action-color);
}
.type[data-names~='防衛'] {
  background: var(--defense-color);
}
.type[data-names~='攻撃'] {
  background: var(--attack-color);
}
.type[data-names~='領地'] {
  background: var(--land-color);
}
.type[data-names~='継承権'] {
  background: var(--authority-color);
}
.type[data-names~='プリンセス'] {
  background: var(--princess-color);
}
.type[data-names~='サポート'] {
  background: var(--support-color);
}
.type[data-names~='?'] {
  background: var(--unknown-color);
}

.type[data-names~='防衛'][data-names~='災い'] {
  background: linear-gradient(to bottom right, var(--defense-color) 70%, #fff 70%, #fff 73%, var(--trouble-color) 73%);
}
.type[data-names~='継承権'][data-names~='領地'] {
  background: linear-gradient(to bottom right, var(--authority-color) 70%, #fff 70%, #fff 73%, var(--land-color) 73%);
}

.name {
  font-weight: bolder;
  margin-left: 0.5ex;
}

.subtype {
  align-self: flex-end;
  color: var(--item-value-color);
  font-size: 80%;
}

.expansion {
  border-radius: 0.25em;
  border: 1px solid rgba(0, 0, 0, 0.05);
  flex: none;
  font-size: 80%;
  line-height: 100%;
  margin-left: auto;
  padding: 0.25em 0.25em;
}

.expansion[data-symbol='基本'] {
  background: #ddd;
  color: #666;
}
.expansion[data-symbol='極東'] {
  background: #eeb;
  color: #884;
}
.expansion[data-symbol='北限'] {
  background: #cce;
  color: #669;
}
.expansion[data-symbol='ＦＧ'] {
  background: #ded;
  color: #696;
}
.expansion[data-symbol='六都'] {
  background: #ece;
  color: #966;
}
.expansion[data-symbol='星天'] {
  background: #fc9;
  color: #642;
}
.expansion[data-symbol='幕間'] {
  background: #fde;
  color: #636;
}
.expansion[data-symbol='レ！'] {
  background: #ee9;
  color: #663;
}

.change-this-card {
  align-items: center;
  background: var(--toast-background-color);
  box-sizing: border-box;
  color: var(--toast-text-color);
  display: flex;
  flex: none;
  height: 100%;
  justify-content: flex-end;
  max-width: 100%;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  transition: width 0.4s;
  width: 0px;
}

.line.start .change-this-card,
.line.doing .change-this-card {
  transition: none;
}

.line.recognized .change-this-card {
  transition-duration: 0.2s;
}

.change-this-card .icon-container {
  padding-right: 1.7em;
}

.change-this-card .icon {
  transition: transform 0.3s;
}

.change-this-card .icon.active {
  transform: scale(1.5) rotate(360deg);
}

</style>
