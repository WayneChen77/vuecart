import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',

    component: () => import('../views/AboutView.vue'),
    children: [
      {
        path: 'comming',
        name: 'comming',
        component: () => import('../views/CommingView.vue'),
      },
      {
        path: 'showing',
        name: 'showing',
        component: () => import('../views/ShowingView.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',

    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/dashboard',
    name: 'ashboard',

    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'filmproduct',
        name: 'filmproduct',
        component: () => import('../views/FilmProduct.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
});

export default router;
