import axios from 'haxios'

export default {
  fetchProducts({ commit }, params) {
    commit('setLoading', true)
    let queryString = ''

    if (params) {
      queryString = Object.keys(params)
        .map((key) => key + '=' + params[key])
        .join('&')
    }

    return axios.get(`/product?${queryString}`).then(({ data }) => {
      commit('setFilteredProducts', data)
      commit('setProducts', data)
      commit('setTotalProducts', data.length)
      commit('setLoading', false)
    })
  },
  fetchCategories({ commit }) {
    return axios.get('/category').then(({ data }) => {
      const categories = data.map((category) => {
        return {
          value: category.id,
          ...category
        }
      })
      commit('setCategories', categories)
    })
  },
  fetchBrands({ commit }) {
    return axios.get('/brand').then(({ data }) => {
      const brands = data.map((brand) => {
        return {
          value: brand.id,
          ...brand
        }
      })
      commit('setBrands', brands)
    })
  },
  filterProducts({commit, state}, query) {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = state.products.filter(product =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      (product.brand && product.brand.name.toLowerCase().includes(lowerCaseQuery)) ||
      (product.category && product.category.name.toLowerCase().includes(lowerCaseQuery))
    );
    commit('setFilteredProducts', filtered);
  }
}
