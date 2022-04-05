export default {

    name: 'rev-forum',
    component: () => import(/* webpackChunkName: "rev-forum" */ '@/modules/rev-forum/layouts/RevForumLayout.vue'),
    children: [
        {
            path: 'rev-list-forum',
            name: 'rev-list-forum',
            component: () => import(/* webpackChunkName: "rev-list-forum" */ '@/modules/rev-forum/views/RevForumList.vue'),
        },
        {
            path: 'rev-list-completed',
            name: 'rev-list-completed',
            component: () => import(/* webpackChunkName: "rev-list-completed" */ '@/modules/rev-forum/views/RevForumListCompleted.vue'),
        },
        {
            path: 'all-forums',
            name: 'all-forums',
            component: () => import(/* webpackChunkName: "all-forums" */ '@/modules/rev-forum/views/ReForumAll.vue'),
        },
    ]
}