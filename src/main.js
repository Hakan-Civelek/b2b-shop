import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import '@/assets/styles.css'
import '@/assets/flags.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import App from './modules/app/index.vue'
import router from './router'
import store from './store';

const app = createApp(App)

app.use(router)
app.use(store)
app.use(PrimeVue)
app.component('Toast', Toast)
app.use(ToastService)

app.mount('#app')