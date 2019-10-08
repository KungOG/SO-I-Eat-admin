import Vue from 'vue';

import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('./views/Login.vue'),
      children: [
        {
          path: '/orderboard',
          name: 'orderboard',
          component: () => import('./views/OrderBoard.vue'),
        },
        {
          path: '/archive',
          name: 'archive',
          component: () => import('./views/Archive.vue'),
        },
        {
          path: '/edit',
          name: 'edit',
          component: () => import('./views/Edit.vue'),
          children: [
            {
              path: '/createdish',
              name: 'createdish',
              component: () => import('./views/CreateDish.vue'),
            },
            {
              path: '/editdish',
              name: 'editdish',
              component: () => import('./views/EditDish.vue'),
            },
          ],
        },
      ],
    },
  ],
});
