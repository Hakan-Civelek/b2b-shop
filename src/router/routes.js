import store from '../store'; // Vuex store'u dahil edin

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { noLayout: true }
  },
  {
    path: '/',
    name: 'dashboard',
    component: import('../modules/mainView/index.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../modules/products/index.vue')
  },
  {
    path: '/products/:id',
    name: 'product',
    component: () => import('../modules/productDetails/index.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../modules/cart/index.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../modules/profile/index.vue')
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: () => import('../modules/adminPanel/index.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters['app/isAdmin']) {
        next()
      } else {
        next('/login')
      }
    },
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../modules/adminPanel/components/products.vue')
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../modules/adminPanel/components/orders.vue')
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('../modules/adminPanel/components/users.vue')
      }
    ],
    meta: { isAdmin: true }
  }
]
