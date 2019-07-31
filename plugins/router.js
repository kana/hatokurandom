export default ({ app }) => {
  app.router.afterEach((to, from) => {
    if (to.path.startsWith('/preferences')) {
      app.store.dispatch('history/preferencesTabLastPath', to.fullPath)
    } else {
      app.store.dispatch('history/homeTabLastPath', to.fullPath)
    }
  })
}
