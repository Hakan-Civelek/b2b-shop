import { createStore } from 'vuex';
import adminPanel from '../modules/adminPanel/store/index.js';
import app from '../modules/app/store/index.js';
import productDetails from '../modules/productDetails/store/index.js';
import productsList from '../modules/productsList/store/index.js';
import managementTable from '../shared/managementTable/store/index.js';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    adminPanel,
    productsList,
    productDetails,
    managementTable
  }
})
