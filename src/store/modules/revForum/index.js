import backendConnect from '../../../api/backend';

const state = {
    status: 'CARGANDO',
    statusC: 'CARGANDO',
    statusA: 'CARGANDO',
    forumsCompleted: '',
    forumsPending: '',
    allForums: [],
    allArray: [],
    allPercent: [],
    completedArray: [],
    userArray: [],
    userRepeat: [],
    forumQuality: [],
    answersArray: [],
    noAnswers: [],
    artTask: [],
    userNeeded: '',
    imgAn: false,
    imgRe: false,
    imgBlocked: false,
    error: false,
}

const getters = {

    forumsState: (state) => (term = '') => {

        if (state.forumsPending.length === 0) {
            return ''
        }

        if (term.length === 0) return state.forumsPending

        return state.forumsPending.filter(forum => forum.name.toLowerCase().includes(term.toLocaleLowerCase()))

    },
    forumsStateCompleted: (state) => (term = '') => {

        if (state.forumsCompleted.length === 0) {
            return ''
        }

        if (term.length === 0) return state.forumsCompleted

        return state.forumsCompleted.filter(forum => forum.name.toLowerCase().includes(term.toLocaleLowerCase()))

    },
    allForumsState: (state) => (term = '') => {

        if (state.allForums.length === 0) {
            return ''
        }

        if (term.length === 0) return state.allForums

        return state.allForums.filter(forum => forum.name.toLowerCase().includes(term.toLocaleLowerCase()))

    },
    getForumNeeded(state) {
        if (state.userNeeded === '') {

            return state.userNeeded = JSON.parse(localStorage.getItem('uN'));
        } else {
            return state.userNeeded
        }



    },
    gettingData: (state) => (dataFormated) => {

        const getForums = state.allForums

        let filters = {};

        for (const keys in dataFormated) {
            if ( (dataFormated[keys].constructor === Object) || (dataFormated[keys].constructor === String && dataFormated[keys].length > 0) ) {
                filters[keys] = dataFormated[keys];
            };
            
        };
        
        const keysInitFin = [
            'dateFormat',
        ];

        
        const filteredData = getForums.filter((item) => {
            for (const key in filters) {
                if (item[key] === undefined) {
                    return false;
                }
                else if (keysInitFin.includes(key)) {
                    if (filters[key]['initDate'] !== '' && item[key] < filters[key]['initDate']) {
                        return false;
                    }
                    if (filters[key]['finDate'] !== '' && item[key] > filters[key]['finDate']) {
                        return false;
                    }
                }
                else if (filters[key] !== item[key]) {
                    return false;
                }
            };
            return true
        });

        const allForums = filteredData

        return {allForums};
    },
    answersRqValue(state) {

        return state.answersArray

    },
    statusState(state) {

        return state.status

    },
    statusStateA(state) {

        return state.statusA

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
        state.allArray = []
        state.allPercent = []
        state.userArray = []
        state.userRepeat = []
        state.forumQuality = []

        state.statusA = 'CARGANDO'

        if (allForums === undefined) return


        localStorage.removeItem('aF')

        if (!localStorage.getItem('aF')) {

            localStorage.setItem('aF', JSON.stringify(allForums));

            const forumsCompleted = allForums.filter(completed => completed.statusForum == 'REVISADO')

            const aForums = JSON.parse(localStorage.getItem('aF'));

            state.allForums = aForums

            state.statusA = 'RECIBIDOS'

            return

        } else {

            return

        }

    },
    saveForums(state, { forumsPending }) {

        if (forumsPending.length === 0) {
            state.forumsPending = ''
            state.status = 'RECIBIDOS'
        }

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
        state.noAnswers = []
        state.artTask = []
        localStorage.removeItem('fC')

        if (!localStorage.getItem('fC')) {
            localStorage.setItem('fC', JSON.stringify(forumsCompleted));
            const fCompleted = JSON.parse(localStorage.getItem('fC'));
            state.forumsCompleted = fCompleted

            state.statusA = 'RECIBIDOS'
            state.statusC = 'RECIBIDOS'
            return
        } else {
            const fCompleted = JSON.parse(localStorage.getItem('fC'));
            state.forumsCompleted = fCompleted
            state.statusA = 'RECIBIDOS'

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
            state.statusC = 'RECIBIDOS'
            return
        } else {
            state.userNeeded = userNeeded
            localStorage.setItem('uN', JSON.stringify(userNeeded))
            state.error = false
            state.statusC = 'RECIBIDOS'
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
    resetA(state) {

        state.statusA = 'CARGANDO'

    },
    logOut(state) {

        state.status = 'CARGANDO',
            state.statusC = 'CARGANDO',
            state.statusA = 'CARGANDO',
            state.forumsCompleted = '',
            state.forumsPending = '',
            state.allForums = [],
            state.userNeeded = '',
            state.imgAn = false
        state.imgRe = false
        state.blocImg = false
        state.error = false
        state.allArray = []
        state.allPercent = []
        state.userArray = []
        state.userRepeat = []
        state.forumQuality = []
        state.answersArray = []
        state.noAnswers = []
        state.artTask = []

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
                commit('allForums', [])
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
    async renoveAll({ commit }, allForums) {
        if (!allForums) return
        commit('allForums', { allForums })
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