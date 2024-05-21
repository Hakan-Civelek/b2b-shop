import router from '@/router';
import axios from 'haxios';

export default {
  login({ commit }, payload) {
    return axios.post('/login', payload).then(({ data }) => {
      commit('setToken', data.token)
    })
  },
  logout({ commit }) {
    localStorage.clear()
    commit('setUser', {})
    commit('setAdmin', false)
    router.push('/login')
  },
  getLoggedInUser({ commit }) {
    return axios.get('/user/me').then(({ data }) => {
      if (data.authorities.includes('ROLE_SYSTEM_OWNER')) {
        commit('setAdmin', true)
      }
      commit('setUser', data)
    })
  }
}
