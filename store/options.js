// TODO: Load from localStorage.
export const state = () => ({
  exclude_banned_cards: true,
  exclude_banned_cards_for_fairy_garden: true,
  exclude_banned_cards_for_trajectory_of_the_star: true,
  include_all_costs: false,
  include_basic: 'may',
  include_fairy: 'may',
  include_fareast: 'may',
  include_link_2: false,
  include_northern: 'may',
  include_six: 'may',
  include_star: 'may',
  must_exclude_cards: []
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
