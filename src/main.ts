import { createApp } from 'vue';
import '/@/assets/style/index.css';
import App from './App.vue';
import router from '/@/router';
import { setupStore } from '/@/store';

const bootstrap = () => {
  const app = createApp(App);

  app.use(router);
  // 配置 Store
  setupStore(app);

  app.mount('#app');
};

bootstrap();
