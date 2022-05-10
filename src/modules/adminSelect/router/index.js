export default {

    name: 'select',
    component: () => import(/* webpackChunkName: "select" */ '@/modules/adminSelect/layouts/SelectorLayout.vue'),
    children: [
        {
            path: '/',
            name: 'admin-menu',
            component: () => import(/* webpackChunkName: "admin-menu" */ '@/modules/adminSelect/views/Select.vue'),
        },
    ]
}