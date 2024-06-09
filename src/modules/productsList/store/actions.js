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
      commit('setProducts', data)
      commit('setTotalProducts', data.length)
      commit('setLoading', false)
    })
  },
  fetchCategories({ commit }) {
    return axios.get('/category').then(({ data }) => {
      const categories = data.map((category) => {
        return {
          name: category.name,
          value: category.id
        }
      })
      commit('setCategories', categories)
    })
  },
  fetchBrands({ commit }) {
    return axios.get('/brand').then(({ data }) => {
      const brands = data.map((brand) => {
        return {
          name: brand.name,
          value: brand.id
        }
      })
      commit('setBrands', brands)
    })
  }
}
