export default {
  setToken(_, value) {
    localStorage.setItem('session_id', value)
  },
  setUser(state, value) {
    state.loggedUser = value
  }
}
