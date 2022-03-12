import backendConnect from '../../../api/backend';

const state = {
    status: 'CARGANDO',
    users: '',
}

const getters = {

    usersState: (state, getters, rootState) => (term = '') => {

        
        if (term.length === 0) return state.users

        return state.users.filter( user => user.name.toLowerCase().includes( term.toLocaleLowerCase() ) )

    },
    statusState(state, getters, rootState) {

        return state.status
        
    },

}

const mutations = {

    saveUsers(state, { users }) {

        state.users = users
        state.status = 'RECIBIDOS'

    },
    deleteUserM(state, {id}) {

        console.log(id);

        state.users = state.users.filter( u => u.uid !== id )

    },

}

const actions = {
   
    async loadUsers({ commit }) {


        try {
            const { data } = await backendConnect.get('/api/users/', {headers: { 'x-token': localStorage.getItem('token') }} )

            if ( !data ) {

                commit('saveUsers', [] )
                return

            }

            const { users } = data

            commit('saveUsers', { users })

            return { ok: true }

        } catch (error) {
            console.log(error)

            return { ok: false, message: error.response.data.errors }
        }
        
    },
    async deleteUser({ commit }, id) {

        commit('deleteUserM', { id })


        return { ok: true }

    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}