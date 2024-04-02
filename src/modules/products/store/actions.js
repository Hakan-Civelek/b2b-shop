import axios from 'haxios';

export default {
  fetchProducts({ commit }) {
    return axios.get('/products')
      .then(({ data }) => {
        commit('setProducts', data.products)
      })
  }
}
