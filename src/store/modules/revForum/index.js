import backendConnect from '../../../api/backend';

const state = {
    status: 'CARGANDO',
    forumsCompleted: '',
    forumsPending: '',
    userNeeded: '',
    imgAn: false,
    imgRe: false,
    imgBlocked: false,
}

const getters = {

    forumsState: (state, getters, rootState) => (term = '') => {


        if (term.length === 0) return state.forumsPending

        return state.forumsPending.filter(forum => forum.name.toLowerCase().includes(term.toLocaleLowerCase()))

    },
    forumsStateCompleted: (state, getters, rootState) => (term = '') => {


        if (term.length === 0) return state.forumsCompleted

        return state.forumsCompleted.filter(forum => forum.name.toLowerCase().includes(term.toLocaleLowerCase()))

    },
    getForumNeeded(state, getters, rootState) {

        const userN = JSON.parse(JSON.stringify(state.userNeeded))

        return userN

    },
    statusState(state, getters, rootState) {

        return state.status

    },

}

const mutations = {

    saveForums(state, { forumsPending }) {

        if (!localStorage.getItem('fP')) {
            localStorage.setItem('fP', JSON.stringify(forumsPending));
            const fPending = JSON.parse(localStorage.getItem('fP'));
            state.forumsPending = fPending
            state.status = 'RECIBIDOS'
            return
        } else {
            const fPending = JSON.parse(localStorage.getItem('fP'));
            state.forumsPending = fPending
            state.status = 'RECIBIDOS'
            return
        }



    },
    getForumById(state, { id }) {

        if (id === null) {
            return state.userNeeded = ''
        }

        state.userNeeded = state.forumsPending.filter(a => a._id == id)

    },
    saveForumsCompleted(state, { forumsCompleted }) {

        state.forumsCompleted = forumsCompleted
        state.status = 'RECIBIDOS'

    },
    deleteForumM(state, { id }) {

        state.forumsPending = state.forumsPending.filter(u => u.uid == id)

    },
    changeImgAn(state, { onImgAn }) {

        state.imgAn = onImgAn

    },
    changeImgRe(state, { onImgRe }) {

        state.imgRe = onImgRe

    },
    logOut(state) {

        state.status = 'CARGANDO',
        state.forumsCompleted = '',
        state.forumsPending = '',
        state.userNeeded = '',
        state.imgAn = false
        state.imgRe = false
        state.blocImg = false

        localStorage.removeItem('fP')

    },
    blocImg(state) {

        state.imgBlocked = true
        state.imgAn = false
        state.imgRe = false

    },
    notBlock(state) {

        state.imgBlocked = false
        state.imgAn = false
        state.imgRe = false

    },
}

const actions = {

    async loadForums({ commit }) {


        try {
            const { data } = await backendConnect.get('/api/forums/', { headers: { 'x-token': localStorage.getItem('token') } })


            if (!data) {

                commit('saveForums', [])
                commit('saveForumsCompleted', [])
                return

            }

            console.log('si data');

            const { forums } = data

            const forumsPending = forums.filter(pending => pending.statusForum == 'PENDIENTE')
            const forumsCompleted = forums.filter(completed => completed.statusForum == 'REVISADO')

            commit('saveForums', { forumsPending })
            commit('saveForumsCompleted', { forumsCompleted })

            return { ok: true }

        } catch (error) {
            return { ok: false, message: error.response.data.errors }
        }

    },
    async deleteForum({ commit }, id) {

        commit('deleteForumM', { id })

        return { ok: true }

    },
    async changeImgAn({ commit }, onImgAn) {
        commit('changeImgAn', { onImgAn })
        return { ok: true }
    },
    async changeImgRe({ commit }, onImgRe) {
        commit('changeImgRe', { onImgRe })
        return { ok: true }
    },
    async getForum({ commit }, id) {
        commit('getForumById', { id })
        return { ok: true }
    },
    async renoveForums({ commit }, forumsPending) {
        if (!forumsPending) return
        commit('saveForums', { forumsPending })
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