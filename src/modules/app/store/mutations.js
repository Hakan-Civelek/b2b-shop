export default {
  setToken(_, value) {
    localStorage.setItem('session_id', value)
  },
  setUser(state, value) {
    state.user = value
  },
  setAdmin(state, value) {
    localStorage.setItem('isAdmin', value)
    state.isAdmin = value
  },
  setMaster(state, value) {
    localStorage.setItem('isMaster', value)
    state.isMaster = value
  }
}
