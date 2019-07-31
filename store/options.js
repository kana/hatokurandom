// TODO: Load from localStorage.
export const state = () => ({
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
})

export const mutations = {
  update (state, { key, value }) {
    state[key] = value
  }
}

// TODO: Save to localStorage.
export const actions = {
  update ({ commit }, { key, value }) {
    commit('update', { key, value })
  }
}
