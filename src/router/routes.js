export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: { noLayout: true },
    },
    {
        path: '/',
        name: 'dashboard',
        component: import('../modules/mainView/index.vue')
    },
    {
        path: '/products',
        name: 'products',
        component: () => import('../modules/products/index.vue'),
    },
    {
        path: '/products/:id',
        name: 'product',
        component: () => import('../modules/productDetails/index.vue')
    }
]