export default {

    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/modules/auth/layouts/AuthLayout.vue'),
    children: [
        {
            path: '/',
            name: 'select-login',
            component: () => import(/* webpackChunkName: "select-login" */ '@/modules/auth/views/SelectLogin.vue'),
        },
        {
            path: 'login-supervisor',
            name: 'login-supervisor',
            component: () => import(/* webpackChunkName: "auth login" */ '@/modules/auth/views/AuthLogin.vue'),
        },
    ]
}