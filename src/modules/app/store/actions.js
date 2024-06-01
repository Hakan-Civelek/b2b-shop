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
    commit('setMaster', false)
    router.push('/login')
  },
  getLoggedInUser({ commit }) {
    return axios.get('/user/me').then(({ data }) => {
      if (data.authorities.includes('ROLE_SYSTEM_OWNER')) {
        commit('setAdmin', true);
        commit('setMaster', true);
    } else if (data.authorities.includes('ROLE_SHOP_OWNER')) {
        commit('setAdmin', true);
        commit('setMaster', false);
    } else {
        // Diğer roller için varsayılan işlemler
        commit('setAdmin', false);
        commit('setMaster', false);
    }
      commit('setUser', data)
    })
  },
  fetchCountries() {
    return axios.get('/country');
  },
  createAddress(_, address) {
    return axios.post('/address', address);
  },
}
