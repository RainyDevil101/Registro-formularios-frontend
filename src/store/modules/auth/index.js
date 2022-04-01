import backendConnect from '../../../api/backend';

const state = {
    status: 'AUTHENTICATING',
    user: '',
    token: null,
    userId: null,
    position: null,
    task: null,
    keyRe: 0,
}

const getters = {
    currentState(state) {
        return state.status
    },
    userName(state) {
        return state.user?.name || ''
    },
    getUser(state) {

        return state.user

    },
    getPosition(state) {
        return state.position
    },
    getTask(state) {
        return state.task
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
        state.keyRe     = 0
    },
    logOut(state) {

        state.user      = '',
        state.token     = null,
        state.status    = null,
        state.userId    = '',
        state.position  = '',
        state.task      = '',
        state.keyRe     = 1,

        localStorage.removeItem('token')

    },
    userPosition(state, {positionUser}) {
        state.position = positionUser
    },
    userTask(state, {taskUser}) {
        state.task = taskUser
    }
}

const actions = {
    async signInUser({ commit }, user) {
        const {mail, password} = user

        try {
            const { data } = await backendConnect.post('/api/auth/login', { mail, password })
            const { user, token } = data
            delete user.password

            const positionUser = data.userPosition
            
            commit('userPosition', {positionUser})
            
            const taskUser = data.userTask

            commit('userTask', {taskUser})

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
            commit('forums/logOut', null, {root: true})
            return { ok: false, message: 'No hay token' }
        }

        try {
            const { data } = await backendConnect.get('/api/auth', {
                headers: { 'x-token': localStorage.getItem('token') }
            })
            const { user, token } = data
            const userId = data.user.uid

            const positionUser = data.userPosition

            const taskUser = data.userTask

            commit('userTask', {taskUser})

            commit('userPosition', {positionUser})

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