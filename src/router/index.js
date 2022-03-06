import { createRouter, createWebHashHistory } from 'vue-router'

import user from '../modules/user/router'
import forum from '../modules/forum/router'
import revForum from '../modules/rev-forum/router'
import menu from '../modules/menu/router'
import revMenu from '../modules/rev-menu/router'
import getForum from '../modules/revForumGet/router'
import auth from '../modules/auth/router'
import loading from '../modules/load/router'
import authGuard from '../modules/auth/router/auth-guard'
import supervisor from '../modules/auth/router/supervisor-verification'
import revisor from '../modules/auth/router/revisor-verification'
import redirect from '../modules/auth/router/redirect'

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
    beforeEnter: [supervisor],
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
  history: createWebHashHistory(),
  routes
})

export default router
