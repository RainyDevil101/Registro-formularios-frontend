import backendConnect from '../../../api/backend';

const state = {
    status: 'CARGANDO',
    forums: '',
    imgAn: false,
    imgRe: false,
}

const getters = {

    forumsState: (state, getters, rootState) => (term = '') => {

        
        if (term.length === 0) return state.forums

        return state.forums.filter( forum => forum.name.toLowerCase().includes( term.toLocaleLowerCase() ) )

    },
    statusState(state, getters, rootState) {

        return state.status
        
    },

}

const mutations = {

    saveForums(state, { forums }) {

        state.forums = forums
        state.status = 'RECIBIDOS'

    },
    deleteForumM(state, {id}) {

        state.forums = state.forums.filter( u => u.uid !== id )

    },
    changeImgAn(state, {onImgAn}) {

        state.imgAn = onImgAn

    },
    changeImgRe(state, {onImgRe}) {

        state.imgRe = onImgRe

    },

}

const actions = {
   
    async loadForums({ commit }) {


        try {
            const { data } = await backendConnect.get('/api/forums/', {headers: { 'x-token': localStorage.getItem('token') }} )
            console.log(data);
            if ( !data ) {

                commit('saveForums', [] )
                return

            }

            const { forums } = data

            commit('saveForums', { forums })

            return { ok: true }

        } catch (error) {
            return { ok: false, message: error.response.data.errors }
        }
        
    },
    async deleteForum({ commit }, id) {

        commit('deleteForumM', { id })

        return { ok: true }

    },
    async changeImgAn({ commit }, onImgAn ) {
        commit('changeImgAn', {onImgAn})
        return { ok: true }        
    },
    async changeImgRe({ commit }, onImgRe ) {
        commit('changeImgRe', {onImgRe})
        return { ok: true }        
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}