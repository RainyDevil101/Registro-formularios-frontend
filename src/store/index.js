import { createStore } from 'vuex'

import auth from './modules/auth'
import users from './modules/users'
import forums from './modules/revForum'
import forumNext from './modules/nextForum'

export default createStore({
  modules: {
    auth,
    users,
    forums,
    forumNext,
  }
})