import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import Loading from 'vue3-loading-overlay';

import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

// 套用千分號
import { currency, date } from './methods/filter';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// 套用全域千分號
app.config.globalProperties.$filters = {
  currency,
  date,
};

app.component('LoadingView', Loading);
app.use(VueAxios, axios);

app.use(router);
app.mount('#app');
