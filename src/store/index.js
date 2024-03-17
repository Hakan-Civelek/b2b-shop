import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const storeOptions = {
    modules: {},
    plugins: [],
};

export default new Vuex.Store(storeOptions);