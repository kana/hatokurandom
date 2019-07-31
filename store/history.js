export const state = () => ({
  homeTabLastPath: '/',
  preferencesTabLastPath: '/preferences'
})

export const mutations = {
  update (state, { key, path }) {
    state[key] = path
  }
}

export const actions = {
  homeTabLastPath ({ commit }, path) {
    commit('update', { key: 'homeTabLastPath', path })
  },
  preferencesTabLastPath ({ commit }, path) {
    commit('update', { key: 'preferencesTabLastPath', path })
  }
}
