import { createApp } from 'vue';
import '/@/assets/style/index.css';
import App from './App.vue';
import router from '/@/router';
import { setupStore } from '/@/store';
import { setupCustomComponents } from '/@/plugins';

const bootstrap = () => {
  const app = createApp(App);
  setupCustomComponents(app);
  app.use(router);
  // 配置 Store
  setupStore(app);

  app.mount('#app');
};

bootstrap();
