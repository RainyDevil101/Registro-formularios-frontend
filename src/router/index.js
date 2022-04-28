import { createRouter, createWebHistory } from 'vue-router'

import auth from '../modules/auth/router'
import authGuard from '../modules/auth/router/auth-guard'
import dashboard from '../modules/dashboard/router'
import forum from '../modules/forum/router'
import getForum from '../modules/revForumGet/router'
import loading from '../modules/load/router'
import menu from '../modules/menu/router'
import redirect from '../modules/auth/router/redirect'
import revForum from '../modules/rev-forum/router'
import revisor from '../modules/auth/router/revisor-verification'
import revMenu from '../modules/rev-menu/router'
import supervisor from '../modules/auth/router/supervisor-verification'
import user from '../modules/user/router'

const routes = [
  

  {
    path: '/',
    ...auth
  },
  {
    path: '/menu',
    beforeEnter: [authGuard],
    beforeEnter: [supervisor],
    ...menu
  },
  {
    path: '/user',
    beforeEnter: [authGuard],
    beforeEnter: [revisor],
    ...user
  },
  {
    path: '/forum',
    beforeEnter: [authGuard],
    beforeEnter: [supervisor],
    ...forum
  },
  {
    path: '/load',
    beforeEnter: [authGuard],
    beforeEnter: [redirect],
    ...loading
  },
  {
    path: '/rev-forum',
    beforeEnter: [authGuard],
    beforeEnter: [revisor],
    ...revForum
  },
  {
    path: '/dashboard',
    beforeEnter: [authGuard],
    beforeEnter: [revisor],
    ...dashboard
  },
  {
    path: '/rev-menu',
    beforeEnter: [authGuard],
    beforeEnter: [revisor],
    ...revMenu
  },
  {
    path: '/getForum',
    beforeEnter: [authGuard],
    beforeEnter: [revisor],
    ...getForum
  },
  {
    path: '/auth',
    ...auth
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
