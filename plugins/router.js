import EventBus from '~/lib/eventbus'
import { parseSpecialPid, pidFromPath } from '~/lib/utils'

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
    if (to.path.startsWith('/preferences')) {
      app.store.dispatch('history/preferencesTabLastPath', to.fullPath)
    } else {
      app.store.dispatch('history/homeTabLastPath', to.fullPath)
    }
  })
}
