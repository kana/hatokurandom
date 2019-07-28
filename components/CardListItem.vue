<template>
  <omni-list-item :props="{ is: 'label' }">
    <div class="label">
      <input v-if="editable" v-show="false" v-model="xcard.dropped" type="checkbox">
      <span class="cost">{{ xcard.cost }}</span>
      <span class="types">{{ xcard.types }}</span>
      <span class="name">{{ xcard.name }}</span>
      <span class="expansion" :data-symbol="expansionSymbol">{{ expansionSymbol }}</span>
    </div>
  </omni-list-item>
</template>

<script>
import OmniListItem from '~/components/OmniListItem'
import { expansionFromEid } from '~/lib/constants'

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
    xcard: {
      type: Object,
      required: true
    }
  },
  computed: {
    expansionSymbol () {
      return expansionFromEid(this.xcard.eid).symbol
    }
  }
}
</script>

<style scoped>

.label {
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.name {
  width: 100%;
}

.expansion {
  border-radius: 0.25em;
  border: 1px solid rgba(0, 0, 0, 0.05);
  flex: none;
  font-size: 80%;
  line-height: 100%;
  padding: 0.25em 0.25em;
}

.expansion[data-symbol='基本'] {
  color: #666;
  background: #ddd;
}
.expansion[data-symbol='極東'] {
  color: #884;
  background: #eeb;
}
.expansion[data-symbol='北限'] {
  color: #669;
  background: #cce;
}
.expansion[data-symbol='ＦＧ'] {
  color: #696;
  background: #ded;
}
.expansion[data-symbol='六都'] {
  color: #966;
  background: #ece;
}
.expansion[data-symbol='星天'] {
  color: #642;
  background: #fc9;
}
.expansion[data-symbol='幕間'] {
  color: #636;
  background: #fde;
}
.expansion[data-symbol='レ！'] {
  color: #663;
  background: #ee9;
}

</style>
