<template>
  <omni-list-item
    v-touch:start="onTouchStart"
    :component="editable ? 'label' : 'div'"
    :clickable="editable"
    :class="{ dropped: xcard.dropped }"
    class="line"
    @touchmove.native="onTouchMove"
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
    <span v-if="random" @click="onClick">[Change]</span>
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
      dx: 0
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
    onClick () {
      this.$emit('change-this-card')
    },
    onTouchStart () {
      // vue2-touch-events updates e.currentTarget.$$touchObj.
      this.dx = 0
    },
    onTouchMove (e) {
      // TODO: Ignore vertical swipe.
      // TODO: Ignore swipe to right.
      // TODO: Show UI based on swipe amout.
      const t = e.currentTarget.$$touchObj
      const dx = t.currentX - t.startX
      const dy = t.currentY - t.startY
      this.dx = `${dx}, ${dy}`

      if (Math.abs(dx) < Math.abs(dy) * 2) {
        return
      }

      // Prevent vertical scroll if user seems to be doing a gesture.
      e.preventDefault()
    }
  }
}
</script>

<style scoped>

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

</style>
