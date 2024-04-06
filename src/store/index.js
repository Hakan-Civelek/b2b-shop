import { createStore } from 'vuex';
import app from '../modules/app/store/index.js';
import productDetails from '../modules/productDetails/store/index.js';
import products from '../modules/productsList/store/index.js';
import managementTable from '../shared/managementTable/store/index.js';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    products,
    productDetails,
    managementTable
  }
})
