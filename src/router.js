import Vue from 'vue';
import { authGuard } from './auth/authGuard';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/archive',
      name: 'archive',
      beforeEnter: authGuard,
      component: () => import('./views/Archive.vue'),
    },
    {
      path: '/edit',
      name: 'edit',
      beforeEnter: authGuard,
      component: () => import('./views/Edit.vue'),
    },
    {
      path: '/orderboard',
      name: 'orderboard',
      beforeEnter: authGuard,
      component: () => import('./views/OrderBoard.vue'),
    },
  ],
});
