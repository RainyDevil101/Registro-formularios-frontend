import { createStore } from 'vuex'

import auth from './modules/auth'
import users from './modules/users'

export default createStore({
  modules: {
    auth,
    users,
  }
})