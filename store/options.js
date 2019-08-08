export const DEFAULT_OPTIONS = {
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

// For backward-compatibility.
const STORAGE_KEY_MAP = {
  excludeBannedCardsByUser: 'must_exclude_cards',
  excludeBannedCardsForAll: 'exclude_banned_cards',
  excludeBannedCardsForFairy: 'exclude_banned_cards_for_fairy_garden',
  excludeBannedCardsForStar: 'exclude_banned_cards_for_trajectory_of_the_star',
  includeAllCosts: 'include_all_costs',
  includeExpansionBasic: 'include_basic',
  includeExpansionFairy: 'include_fairy',
  includeExpansionFareast: 'include_fareast',
  includeExpansionNorthern: 'include_northern',
  includeExpansionSix: 'include_six',
  includeExpansionStar: 'include_star',
  includeLink2: 'include_link_2'
}

export const state = () => ({ ...DEFAULT_OPTIONS })

export const mutations = {
  update (state, { key, value }) {
    state[key] = value
  }
}

export const actions = {
  loadSavedState ({ commit }) {
    for (const key of Object.keys(DEFAULT_OPTIONS)) {
      const value = localStorage.getItem(STORAGE_KEY_MAP[key])
      if (value !== null) {
        commit('update', { key, value: JSON.parse(value) })
      }
    }
  },
  reset ({ commit }) {
    for (const key of Object.keys(DEFAULT_OPTIONS)) {
      commit('update', { key, value: DEFAULT_OPTIONS[key] })
      localStorage.removeItem(STORAGE_KEY_MAP[key])
    }
  },
  update ({ commit }, { key, value }) {
    commit('update', { key, value })
    localStorage.setItem(STORAGE_KEY_MAP[key], JSON.stringify(value))
  }
}
