import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import '../src/assets/css/global.css';

import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';

axios.defaults.baseURL = '/api';

// 请求拦截器
axios.interceptors.request.use(config => {
  return config;
});
// 响应拦截器
axios.interceptors.response.use(
  res => {
    // let message = Vue.prototype.$message
    if (res.data.code === 200) {
      return res.data;
    }
  },
  err => {
    console.error(err);
    return Promise.reject(err);
  }
);

createApp(App)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(router)
  .use(store)
  .mount('#app');
