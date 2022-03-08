export default {

    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '@/modules/user/layouts/UserLayout.vue'),
    children: [
        {
            path: '',
            name: 'user-view-create',
            component: () => import(/* webpackChunkName: "create user" */ '@/modules/user/views/UserViewCreate.vue'),
        },
        {
            path: ':id',
            name: 'user-view',
            component: () => import(/* webpackChunkName: "create user" */ '@/modules/user/views/UserView.vue'),
            props: (route) => {
                id: route.params.id
            }
        },
    ]
}