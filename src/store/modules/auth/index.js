import backendConnect from '../../../api/backend';

const state = {
    status: 'AUTHENTICATING',
    user: null,
    token: null,
    userId: null
}

const getters = {
    currentState(state) {
        return state.status
    },
    userName(state) {
        return state.user?.name || ''
    },
}

const mutations = {
    loginUser(state, {user, token, userId}) {

        if (token) {
            localStorage.setItem('token', token)
            state.token = token
        }

        state.user      = user
        state.status    = 'authenticated'
        state.userId    = userId

    },
    logOut(state) {

        state.user      = null,
        state.token     = null,
        state.status    = null,
        state.userId    = null,

        localStorage.removeItem('token')

    },
}

const actions = {
    async signInUser({ commit }, user) {
        const {mail, password} = user

        try {
            const { data } = await backendConnect.post('/api/auth/login', { mail, password })
            const { user, token } = data




            delete user.password
            commit('loginUser', { user, token })

            return { ok: true }

        } catch (error) {
            console.log(error)

            return { ok: false, message: error.response.data.errors }
        }
        
    },
    async readToken({ commit }) {

        if (!localStorage.getItem('token')) {
            commit('logOut')
            return { ok: false, message: 'No hay token' }
        }

        try {
            const { data } = await backendConnect.get('/api/auth', {
                headers: { 'x-token': localStorage.getItem('token') }
            })
            const { user, token } = data
            const userId = data.user.uid

            commit('loginUser', { user, token, userId })
            return { ok: true, user }



        } catch (error) {
            commit('logOut')
            return { ok: false, message: error.response }

        }
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}