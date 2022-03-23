import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '../src/assets/css/global.css';


import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';

createApp(App)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(router)
  .use(store)
  .mount('#app');
