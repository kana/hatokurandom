import { orderBy } from 'lodash-es'

const STORAGE_KEY = 'recorded_supplies'
const MAX_ITEM_COUNT = 10000 // Less than 500KiB.

export const state = () => ({
  items: [] // { sid: String, at: Number }[]
})

export const mutations = {
  delete (state, { index }) {
    state.items.splice(index, 1)
  },
  pop (state) {
    state.items.pop()
  },
  replace (state, items) {
    state.items.splice(0, state.items.length)
    for (const item of items) {
      state.items.push(item)
    }
  },
  unshift (state, { sid, at }) {
    state.items.unshift({ sid, at })
  }
}

export const actions = {
  loadSavedState ({ commit }) {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value !== null) {
      // This orderBy can be removed after 2019-09.
      commit('replace', orderBy(JSON.parse(value), ['at'], ['desc']))
    }
  },
  append ({ commit, state }, { sid, at }) {
    commit('unshift', { sid, at })
    if (state.items.length > MAX_ITEM_COUNT) {
      commit('pop')
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  },
  delete ({ commit, state }, { index }) {
    commit('delete', { index })
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }
}
