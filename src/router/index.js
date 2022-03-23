import { createRouter, createWebHashHistory } from 'vue-router';
import home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    children: [
      // {
      //   path: '/home',
      //   name: 'home',
      //   component: () => import('@/views/pages/home/home'),
      //   meta: { useTab: true, tabName: '首页' },
      // },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: ()=> import('@/views/About'),
    children: [
      // {
      //   path: '/home',
      //   name: 'home',
      //   component: () => import('@/views/pages/home/home'),
      //   meta: { useTab: true, tabName: '首页' },
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
