export default {

    name: 'get',
    component: () => import(/* webpackChunkName: "get-forum" */ '@/modules/revForumGet/layouts/GetForumLayout.vue'),
    children: [
        {
            path: ':id',
            name: 'get-forum',
            component: () => import(/* webpackChunkName: "rev-front-forum" */ '@/modules/revForumGet/views/GetForumView.vue'),
            props: (route) => {
                id: route.params.id
            },
        },
        {
            path: 'completed/:id',
            name: 'get-forum-completed',
            component: () => import(/* webpackChunkName: "rev-front-completed" */ '@/modules/revForumGet/views/ForumCompletedView.vue'),
            props: (route) => {
                id: route.params.id
            },
        },
        {
            path: 'get-forum-next',
            name: 'get-forum-next',
            component: () => import(/* webpackChunkName: "rev-next-forum" */ '@/modules/revForumGet/views/GetForumNext.vue'),
        },
        {
            path: '',
            name: 'no-forum',
            component: () => import(/* webpackChunkName: "no-forum" */ '@/modules/revForumGet/views/NoForum.vue'),
        },
    ]
}