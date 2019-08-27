import EventBus from '~/lib/eventbus'
import { isPreferencesTabPid, parseSpecialPid, pidFromPath } from '~/lib/utils'

export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    const f = parseSpecialPid(pidFromPath(from.path))
    const t = parseSpecialPid(pidFromPath(to.path))
    if (f.random && !t.random) {
      EventBus.$emit('leaving-from-randomizer-page')
    }

    next()
  })

  app.router.afterEach((to, from) => {
    app.store.dispatch('history/navigate', to.path)
    if (isPreferencesTabPid(pidFromPath(to.path))) {
      app.store.dispatch('history/preferencesTabLastPath', to.fullPath)
    } else {
      app.store.dispatch('history/homeTabLastPath', to.fullPath)
    }
  })
}
