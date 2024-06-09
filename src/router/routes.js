export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { noLayout: true }
  },
  {
    path: '/',
    name: 'mainView',
    component: import('../modules/mainView/index.vue'),
    beforeEnter: (to, from, next) => {
      next('/products');
    }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../modules/productsList/index.vue'),
  },
  {
    path: '/products/:id',
    name: 'product',
    component: () => import('../modules/productDetails/index.vue')
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('../modules/card/index.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../modules/profile/index.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../modules/orders/index.vue')
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: () => import('../modules/adminPanel/index.vue'),
    children: [
      {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: () => import('../modules/adminPanel/components/dashboard.vue')
      },
      {
        path: '/admin/products',
        name: 'AdminProducts',
        component: () => import('../modules/adminPanel/components/products.vue')
      },
      {
        path: '/admin/categories',
        name: 'AdminCategories',
        component: () => import('../modules/adminPanel/components/categories.vue')
      },
      {
        path: '/admin/brands',
        name: 'AdminBrands',
        component: () => import('../modules/adminPanel/components/brands.vue')
      },
      {
        path: '/admin/orders',
        name: 'AdminOrders',
        component: () => import('../modules/adminPanel/components/orders.vue')
      },
      {
        path: '/admin/customers',
        name: 'AdminCustomers',
        component: () => import('../modules/adminPanel/components/customers.vue')
      },
      {
        path: '/admin/users',
        name: 'AdminUsers',
        component: () => import('../modules/adminPanel/components/users.vue')
      },
      {
        path: '/admin/profile',
        name: 'AdminProfile',
        component: () => import('../modules/adminPanel/components/profile.vue')
      },
      {
        path: '/admin/configuration',
        name: 'AdminSettings',
        component: () => import('../modules/adminPanel/components/settings.vue')
      }
    ],
    meta: { isAdmin: true, layout: 'admin', noLayout: true }
  }
]
