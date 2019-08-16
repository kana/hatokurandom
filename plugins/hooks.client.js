if (process.browser) {
  window.onNuxtReady((app) => {
    app.$store.dispatch('options/loadSavedState')
    app.$store.dispatch('log/loadSavedState')
  })

  if (navigator.standalone) {
    document.body.classList.add('standalone')
  }
}
