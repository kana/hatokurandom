import { isPreferencesTabPid, parentPidFromPid, pathFromPid, pidFromPath } from '~/lib/utils'

export const state = () => ({
  homeTabPathStack: [],
  preferencesTabPathStack: []
})

export const mutations = {
  push (state, { key, pid, fullPath }) {
    state[key].push({ pid, fullPath })
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
      const navigationStack = state[key]
      const entry = navigationStack[navigationStack.length - 2]
      return entry && entry.fullPath
    }
  },
  homeTabLastPath (state) {
    const entry = state.homeTabPathStack[state.homeTabPathStack.length - 1]
    return entry ? entry.fullPath : '/'
  },
  preferencesTabLastPath (state) {
    const entry = state.preferencesTabPathStack[state.preferencesTabPathStack.length - 1]
    return entry ? entry.fullPath : '/preferences'
  }
}

export const actions = {
  navigate ({ commit, state }, fullPath) {
    const pid = pidFromPath(fullPath)
    const key = isPreferencesTabPid(pid) ? 'preferencesTabPathStack' : 'homeTabPathStack'

    if (state[key].length === 0) {
      commit('update', { key, value: guessInitialPathStack(pid) })
      return
    }

    const i = state[key].findIndex(entry => entry.pid === pid)
    if (i !== -1) {
      commit('splice', { key, i })
    }

    commit('push', { key, pid, fullPath })
  }
}

function guessInitialPathStack (pid) {
  const navigationStack = []
  while (pid) {
    navigationStack.unshift({ pid, fullPath: pathFromPid(pid) })
    pid = parentPidFromPid(pid)
  }
  return navigationStack
}
