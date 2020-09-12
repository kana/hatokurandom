import EventBus from '~/lib/eventbus'
import { setUp as setUpLibRouter } from '~/lib/router'
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
    app.store.dispatch('history/navigate', to.fullPath)
  })

  setUpLibRouter(app.router.options.routes)
}
