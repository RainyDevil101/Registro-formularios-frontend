import backendConnect from '../../../api/backend';

const state = {
    status: 'CARGANDO',
    statusC: 'CARGANDO',
    statusA: 'CARGANDO',
    forumsCompleted: '',
    forumsPending: '',
    allForums: '',
    userNeeded: '',
    imgAn: false,
    imgRe: false,
    imgBlocked: false,
    error: false,
}

const getters = {

    forumsState: (state) => (term = '') => {


        if (term.length === 0) return state.forumsPending

        return state.forumsPending.filter(forum => forum.name.toLowerCase().includes(term.toLocaleLowerCase()))

    },
    forumsStateCompleted: (state) => (term = '') => {


        if (term.length === 0) return state.forumsCompleted

        return state.forumsCompleted.filter(forum => forum.name.toLowerCase().includes(term.toLocaleLowerCase()))

    },
    getForumNeeded(state) {

        if (state.userNeeded === '') {
            return JSON.parse(localStorage.getItem('fP'));
        } else {
            return state.userNeeded
        }



    },
    statusState(state) {

        return state.status

    },
    completedState(state) {

        return state.statusC

    },
    errorState(state) {
        return state.error
    }

}

const mutations = {

    allForums(state, { allForums }) {

        state.userNeeded = ''
        state.allForums = ''
        localStorage.removeItem('aF')

        if ( allForums === undefined ) return

        if (!localStorage.getItem('aF')) {

            localStorage.setItem('aF', JSON.stringify(allForums));
            const aForums = JSON.parse(localStorage.getItem('aF'));
            state.allForums = aForums
            state.statusA = 'RECIBIDOS'

            return

        } else {

            const aForums = JSON.parse(localStorage.getItem('aF'));
            state.allForums = aForums
            state.statusA = 'RECIBIDOS'

            return

        }



    },
    saveForums(state, { forumsPending }) {

        state.userNeeded = ''
        state.forumsPending = ''
        localStorage.removeItem('fP')

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
    saveForumsCompleted(state, { forumsCompleted }) {

        state.userNeeded = ''
        state.forumsCompleted = ''
        localStorage.removeItem('fC')

        if (!localStorage.getItem('fC')) {
            localStorage.setItem('fC', JSON.stringify(forumsCompleted));
            const fCompleted = JSON.parse(localStorage.getItem('fC'));
            state.forumsCompleted = fCompleted
            state.statusC = 'RECIBIDOS'
            return
        } else {
            const fCompleted = JSON.parse(localStorage.getItem('fC'));
            state.forumsCompleted = fCompleted
            state.statusC = 'RECIBIDOS'
            return
        }



    },
    getForumById(state, { id }) {

        if (id === null) {
            state.userNeeded = ''
            return
        }

        if (state.allForums === '') return

        const userNeeded = state.allForums.filter(a => a._id == id)

        if (userNeeded.length === 0) {
             state.userNeeded = ''
             state.error = true
             return
        } else {
            state.userNeeded = userNeeded
            localStorage.setItem('uN', JSON.stringify(userNeeded))
            state.error = false
            return
        }
    },
    getForumByCompleted(state, { id }) {

        if (id === null) {
            state.userNeeded = ''
            return
        }

        const userNeeded = state.forumsCompleted.filter(a => a._id == id)

        if (userNeeded.length === 0) {
             state.userNeeded = ''
             state.error = true
             return
        } else {
            state.userNeeded = userNeeded
            localStorage.setItem('uN', JSON.stringify(userNeeded))
            state.error = false
            return
        }
    },
    renovateUserNeeded(state) {

        if (!localStorage.getItem('uN')) {
            return
        } else {

            state.userNeeded = JSON.parse(localStorage.getItem('uN'))

        }

    },
    deleteForumM(state, { id }) {

        state.forumsPending = state.forumsPending.filter(u => u.uid == id)

    },
    deleteForumC(state, { id }) {

        state.forumsCompleted = state.forumsCompleted.filter(u => u.uid == id)

    },
    changeImgAn(state, { onImgAn }) {

        state.imgAn = onImgAn

    },
    changeImgRe(state, { onImgRe }) {

        state.imgRe = onImgRe

    },
    logOut(state) {

        state.status = 'CARGANDO',
        state.statusC = 'CARGANDO',
        state.statusA = 'CARGANDO',
        state.forumsCompleted = '',
        state.forumsPending = '',
        state.allForums = '',
        state.userNeeded = '',
        state.imgAn = false
        state.imgRe = false
        state.blocImg = false
        state.error = false

        localStorage.removeItem('fP')
        localStorage.removeItem('uN')
        localStorage.removeItem('fC')
        localStorage.removeItem('aF')
        
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

            const { forums } = data

            const forumsPending = forums.filter(pending => pending.statusForum == 'PENDIENTE')
            const forumsCompleted = forums.filter(completed => completed.statusForum == 'REVISADO')
            const allForums = forums

            commit('saveForums', { forumsPending })
            commit('saveForumsCompleted', { forumsCompleted })
            commit('allForums', { allForums })

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
    async renoveCompleted({ commit }, forumsCompleted) {
        if (!forumsCompleted) return
        commit('saveForumsCompleted', { forumsCompleted })
        return { ok: true }
    },
    async renoveAll({ commit }, forums) {
        if (!forums) return
        commit('allForums', { forums })
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