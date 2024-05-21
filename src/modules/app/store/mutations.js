export default {
  setToken(_, value) {
    localStorage.setItem('session_id', value)
  },
  setUser(state, value) {
    state.user = value
  },
  setAdmin(state, value) {
    state.isAdmin = value
  }
}
