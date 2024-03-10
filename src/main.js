import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import '@/assets/styles.css'
import '@/assets/flags.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import App from './modules/app/App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.component('Toast', Toast)
app.use(ToastService)

app.mount('#app')