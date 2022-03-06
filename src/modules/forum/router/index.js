export default {

    name: 'forum',
    component: () => import(/* webpackChunkName: "forum" */ '@/modules/forum/layouts/ForumLayout.vue'),
    children: [
        {
            path: '',
            name: 'front-forum',
            component: () => import(/* webpackChunkName: "front-forum" */ '@/modules/forum/views/ForumView.vue'),
        },
    ]
}