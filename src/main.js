import '@/assets/flags.css';
import '@/assets/styles.css';
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

import PrimeVue from 'primevue/config';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';

import axios from 'haxios';
import App from './modules/app/index.vue';
import router from './router';
import store from './store';
import './utils/tokenInterceptor.js';

axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;

const app = createApp(App)

app.use(router)
app.use(store)
app.use(PrimeVue)
app.component('Toast', Toast)
app.use(ToastService)

app.mount('#app')