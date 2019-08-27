import { isPreferencesTabPid, pidFromPath } from '~/lib/utils'

export const state = () => ({
  homeTabLastPath: '/',
  homeTabPathStack: [],
  preferencesTabLastPath: '/preferences',
  preferencesTabPathStack: []
})

export const mutations = {
  push (state, { key, path }) {
    state[key].push(path)
  },
  splice (state, { key, i }) {
    state[key].splice(i)
  },
  update (state, { key, path }) {
    state[key] = path
  }
}

export const actions = {
  navigate ({ commit, state }, path) {
    const pid = pidFromPath(path)
    const key = isPreferencesTabPid(pid) ? 'preferencesTabPathStack' : 'homeTabPathStack'

    const i = state[key].indexOf(path)
    if (i !== -1) {
      commit('splice', { key, i })
    }

    commit('push', { key, path })
  },
  homeTabLastPath ({ commit }, path) {
    commit('update', { key: 'homeTabLastPath', path })
  },
  preferencesTabLastPath ({ commit }, path) {
    commit('update', { key: 'preferencesTabLastPath', path })
  }
}
