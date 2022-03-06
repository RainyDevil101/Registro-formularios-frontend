export default {

    name: 'rev-menu',
    component: () => import(/* webpackChunkName: "rev-menu" */ '@/modules/rev-menu/layouts/RevMenuLayout.vue'),
    children: [
        {
            path: '',
            name: 'rev-front-menu',
            component: () => import(/* webpackChunkName: "rev-front-menu" */ '@/modules/rev-menu/views/RevMenuView.vue'),
        },
    ]
}