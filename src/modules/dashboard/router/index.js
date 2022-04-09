export default {

    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/modules/dashboard/layouts/DashboardLayout.vue'),
    children: [
        {
            path: '',
            name: 'dashboard-view',
            component: () => import(/* webpackChunkName: "dashboard-view" */ '@/modules/dashboard/views/DashboardView.vue'),
        },
    ]
}