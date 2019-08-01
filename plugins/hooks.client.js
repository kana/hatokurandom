if (process.browser) {
  window.onNuxtReady((app) => {
    app.$store.dispatch('options/loadSavedState')
  })
}
