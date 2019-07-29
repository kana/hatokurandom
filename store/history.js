export const state = () => ({
  homeTabLastPath: '/'
})

export const mutations = {
  homeTabLastPath (state, path) {
    state.homeTabLastPath = path
  }
}

export const actions = {
  homeTabLastPath ({ commit }, path) {
    commit('homeTabLastPath', path)
  }
}
