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
export const state = () => ({
  ...DEFAULT_OPTIONS
})

export const mutations = {
  reset (state) {
    for (const key of Object.keys(DEFAULT_OPTIONS)) {
      state[key] = DEFAULT_OPTIONS[key]
    }
  },
  update (state, { key, value }) {
    state[key] = value
  }
}

// TODO: Save to localStorage.
export const actions = {
  reset ({ commit }) {
    commit('reset')
  },
  update ({ commit }, { key, value }) {
    commit('update', { key, value })
  }
}
