const STORAGE_KEY = 'recorded_supplies'
const MAX_ITEM_COUNT = 10000 // Less than 500KiB.

export const state = () => ({
  items: [] // { sid: String, at: Number }[]
})

export const mutations = {
  push (state, { sid, at }) {
    state.items.push({ sid, at })
  },
  replace (state, items) {
    state.items.splice(0, state.items.length)
    for (const item of items) {
      state.items.push(item)
    }
  },
  shift (state) {
    state.items.shift()
  }
}

export const actions = {
  loadSavedState ({ commit }) {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value !== null) {
      commit('replace', JSON.parse(value))
    }
  },
  push ({ commit, state }, { sid, at }) {
    commit('push', { sid, at })
    if (state.items.length > MAX_ITEM_COUNT) {
      commit('shift')
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }
}
