import { createWebHistory, createRouter } from 'vue-router';
import checkAuth from './utils/check-auth';

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('./pages/home.vue'),
    beforeEnter: () => checkAuth(false),
  },
  {
    name: 'help',
    path: '/help',
    component: () => import('./pages/help.vue'),
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('./pages/dashboard.vue'),
    beforeEnter: () => checkAuth(true),
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('./pages/login.vue'),
    beforeEnter: () => checkAuth(false),
  },
  {
    name: 'signup',
    path: '/signup',
    component: () => import('./pages/signup.vue'),
    beforeEnter: () => checkAuth(false),
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('./pages/settings.vue'),
    beforeEnter: () => checkAuth(true),
  },
  {
    name: 'import',
    path: '/import',
    component: () => import('./pages/import.vue'),
    beforeEnter: () => checkAuth(true),
  },
  {
    name: 'error',
    path: '/:pathMatch(.*)*',
    component: () => import('./pages/error.vue'),
    beforeEnter: () => checkAuth(false),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
