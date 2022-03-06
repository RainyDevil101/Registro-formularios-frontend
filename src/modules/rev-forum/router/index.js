export default {

    name: 'rev-forum',
    component: () => import(/* webpackChunkName: "rev-forum" */ '@/modules/rev-forum/layouts/RevForumLayout.vue'),
    children: [
        {
            path: '',
            name: 'rev-list-forum',
            component: () => import(/* webpackChunkName: "rev-list-forum" */ '@/modules/rev-forum/views/RevForumList.vue'),
        },

    ]
}