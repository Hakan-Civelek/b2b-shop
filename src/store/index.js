import { createStore } from 'vuex'
import app from '../modules/app/store/index.js'
import productDetails from '../modules/productDetails/store/index.js'
import products from '../modules/products/store/index.js'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    products,
    productDetails,
  }
})
