import axios from 'haxios';

export default {
  fetchProducts({ commit }) {
    commit('setLoading', true);

    return axios.get('/products')
      .then(({ data }) => {
        commit('setProducts', data.products);
        commit('setLoading', false);
      })
  }
}
