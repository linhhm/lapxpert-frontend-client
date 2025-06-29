import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "@fortawesome/fontawesome-free/css/all.css";
import '../src/style.css'; // ✅ ok nếu bạn để style trong /src

import { createPinia } from 'pinia'; // ✅ đã import đúng

const app = createApp(App);
app.use(router);
app.use(createPinia()); // ✅ đã dùng pinia
app.mount('#app');
