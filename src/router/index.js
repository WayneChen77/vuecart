import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/FilmAboutView',
    name: 'FilmAboutView',

    component: () => import('../views/FilmAboutView.vue'),
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
    path: '/userproduct/:id',
    name: 'userproduct',

    component: () => import('../views/UserProduct.vue'),
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
