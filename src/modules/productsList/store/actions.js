import axios from 'haxios';

export default {
  fetchProducts({ commit }, params) {
    commit('setLoading', true);

    return axios.get(`/product${params ? `?categoryId=${params}` : ''}`)
      .then(({ data }) => {
        commit('setProducts', data);
        commit('setTotalProducts', data.total);
        commit('setLoading', false);
      })
  },
  fetchCategories({ commit }) {
    return axios.get('/category')
      .then(({ data }) => {
        const categories = data.map((category) => {
          return {
            name: category.name,
            value: category.id
          }
        })
        commit('setCategories', categories);
      })
  },
}

