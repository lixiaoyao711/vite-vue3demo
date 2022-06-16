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
axios.interceptors.request.use((config) => {
  return config;
});
// 响应拦截器
axios.interceptors.response.use(
  (res) => {
    // let message = Vue.prototype.$message
    if (res.data.code === 200) {
      return res.data;
    }
  },
  (err) => {
    console.error(err);
    return Promise.reject(err);
  }
);

// 全局配置el-icon配置后不用每个模块导入
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(router)
  .use(store)
  .mount('#app');
