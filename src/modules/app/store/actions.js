import router from '@/router';
import axios from 'haxios';

export default {
  login({ commit, dispatch }, payload) {
    return axios.post('/auth/login', payload).then(({ data }) => {
      commit('setToken', data.token)

      return dispatch('getLoggedInUser')
    })
  },
  logout({ commit }) {
    commit('setToken', '')
    commit('setUser', {})

    router.push('/login')
  },
  getLoggedInUser({ commit }) {
    return axios.get('/auth/me').then(({ data }) => {
      commit('setUser', data)
    })
  }
}
