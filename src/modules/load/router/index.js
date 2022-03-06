export default {

    name: 'load',
    component: () => import(/* webpackChunkName: "load" */ '@/modules/load/layouts/LoadLayout.vue'),
    children: [
        {
            path: '/',
            name: 'loading',
            component: () => import(/* webpackChunkName: "loading" */ '@/modules/load/views/Loading.vue'),
        },
    ]
}