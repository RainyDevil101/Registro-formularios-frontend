export default {

    name: 'menu',
    component: () => import(/* webpackChunkName: "menu" */ '@/modules/menu/layouts/MenuLayout.vue'),
    children: [
        {
            path: '',
            name: 'front-menu',
            component: () => import(/* webpackChunkName: "front-menu" */ '@/modules/menu/views/MenuView.vue'),
        },
    ]
}