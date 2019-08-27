import { isPreferencesTabPid, parentPidFromPid, pathFromPid, pidFromPath } from '~/lib/utils'

export const state = () => ({
  homeTabPathStack: [],
  preferencesTabPathStack: []
})

export const mutations = {
  push (state, { key, path }) {
    state[key].push(path)
  },
  splice (state, { key, i }) {
    state[key].splice(i)
  },
  update (state, { key, value }) {
    state[key] = value
  }
}

export const getters = {
  backPath (state) {
    return function (pid) {
      const key = isPreferencesTabPid(pid) ? 'preferencesTabPathStack' : 'homeTabPathStack'
      const pathStack = state[key]
      return pathStack[pathStack.length - 2]
    }
  },
  homeTabLastPath (state) {
    return state.homeTabPathStack[state.homeTabPathStack.length - 1] || '/'
  },
  preferencesTabLastPath (state) {
    return state.preferencesTabPathStack[state.preferencesTabPathStack.length - 1] || '/preferences'
  }
}

export const actions = {
  navigate ({ commit, state }, path) {
    const pid = pidFromPath(path)
    const key = isPreferencesTabPid(pid) ? 'preferencesTabPathStack' : 'homeTabPathStack'

    if (state[key].length === 0) {
      commit('update', { key, value: guessInitialPathStack(pid) })
      return
    }

    const i = state[key].indexOf(path)
    if (i !== -1) {
      commit('splice', { key, i })
    }

    commit('push', { key, path })
  }
}

function guessInitialPathStack (pid) {
  const pathStack = []
  while (pid) {
    pathStack.unshift(pathFromPid(pid))
    pid = parentPidFromPid(pid)
  }
  return pathStack
}
