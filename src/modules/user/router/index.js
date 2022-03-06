export default {

    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '@/modules/user/layouts/UserLayout.vue'),
    children: [
        {
            path: '',
            name: 'user-test',
            component: () => import(/* webpackChunkName: "user test" */ '@/modules/user/views/UserTest.vue'),
        },
    ]
}