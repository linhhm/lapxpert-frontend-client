import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import "@fortawesome/fontawesome-free/css/all.css";


import '../src/style.css'; // Nếu tên file là style.css
;

const app = createApp(App);
app.use(router);
app.mount('#app');