import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import AutoImport from 'unplugin-auto-import/vite';
const { resolve } = require('path'); //必须要引入resolve

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {},
  },
  define: {
    'process.env': {},
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
      dts: 'src/auto-import.d.js', // 生成 `auto-import.d.ts` 全局声明
    }),

    // 配置插件
    // viteExternalsPlugin({
    //   echarts: 'echarts',
    //   lazy: ['echarts'],
    // }),
  ],
  //配置端口
  server: {
    host: '0.0.0.0',
    port: 5050,
    proxy: {
      '^/system': {
        // 236 何奕, 126 玮琪, 147 本地测试， 137 柴思进，
        target: 'http://192.168.1.137:9001',
        // rewrite: (path) => path.replace(/^\/dev-api/, ''),
        changeOrigin: true,
      },
    },
  },
  resolve: {
    //配置可忽略的后缀名
    extensions: ['.js', '.vue', '.json'],
    //配置路径别名
    alias: [
      // webComponents配置
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
  },
});
