import Vue from 'vue';
import Router from 'vue-router';
import { authGuard } from './auth/authGuard';

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
      path: '/loading',
      name: 'loading',
      component: () => import('./components/Loading.vue'),
    },
    {
      path: '/orderboard',
      name: 'orderboard',
      //beforeEnter: authGuard,
      component: () => import('./views/OrderBoard.vue'),
    },
  ],
});
