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
            }
        },
    ]
}