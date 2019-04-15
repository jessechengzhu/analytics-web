export default {
  setUser (state, user) {
    state.user = user
  },
  clearUser (state) {
    state.user = null
    state.websites = []
    state.currentWebsite = null
    localStorage.setItem('token', '')
  },
  setWebsites (state, websites) {
    state.websites = websites
  },
  setCurrentWebsite (state, website) {
    state.currentWebsite = website
  }
}
