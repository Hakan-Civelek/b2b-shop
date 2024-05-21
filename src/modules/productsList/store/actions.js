import axios from 'haxios';

export default {
  fetchProducts({ commit }, params) {
    commit('setLoading', true);

    return axios.get(`/product${params ? `/category/${params}` : ''}`)
      .then(({ data }) => {
        commit('setProducts', data);
        commit('setTotalProducts', data.total);
        commit('setLoading', false);
      })
  },
  fetchCategories({ commit }) {
    return axios.get('/products/categories')
      .then(({ data }) => {
        const categories = data.map((category) => {
          return {
            name: category.charAt(0).toUpperCase() + category.slice(1),
            value: category
          }
        })
        commit('setCategories', categories);
      })
  },
  addBasket({ commit }, product) {
    return axios.post('/basket', product)
      .then(({ data }) => {
        commit('setBasket', data);
      })
  }
}

