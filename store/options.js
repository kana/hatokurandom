const DEFAULT_OPTIONS = {
  excludeBannedCardsByUser: [], // cid[]
  excludeBannedCardsForAll: true,
  excludeBannedCardsForFairy: true,
  excludeBannedCardsForStar: true,
  includeAllCosts: false,
  includeExpansionBasic: 'may',
  includeExpansionFairy: 'may',
  includeExpansionFareast: 'may',
  includeExpansionNorthern: 'may',
  includeExpansionSix: 'may',
  includeExpansionStar: 'may',
  includeLink2: false
}

// TODO: Load from localStorage.
export const state = () => ({ ...DEFAULT_OPTIONS })

export const mutations = {
  update (state, { key, value }) {
    state[key] = value
  }
}

export const actions = {
  loadSavedState ({ commit }) {
    for (const key of Object.keys(DEFAULT_OPTIONS)) {
      const value = localStorage.getItem(key)
      if (value !== null) {
        commit('update', { key, value: JSON.parse(value) })
      }
    }
  },
  reset ({ dispatch }) {
    for (const key of Object.keys(DEFAULT_OPTIONS)) {
      dispatch('update', { key, value: DEFAULT_OPTIONS[key] })
    }
  },
  update ({ commit }, { key, value }) {
    commit('update', { key, value })
    localStorage.setItem(key, JSON.stringify(value))
  }
}
