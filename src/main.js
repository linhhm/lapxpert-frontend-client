import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import "@fortawesome/fontawesome-free/css/all.css";
import './style.css'; // hoặc '../src/style.css' nếu bạn đặt tên như vậy

const app = createApp(App);

const pinia = createPinia(); // ✅ tạo biến pinia
pinia.use(piniaPluginPersistedstate); // ✅ rồi mới .use plugin

app.use(router);
app.use(pinia); // ✅ đưa vào app

app.mount('#app');
