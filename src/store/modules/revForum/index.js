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
    allArray(state) {

        return state.allArray

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
        state.allForums = []
        state.allArray = []
        state.allPercent = []
        state.userArray = []
        state.userRepeat = []
        state.forumQuality = []

        state.statusA = 'CARGANDO'

        if (allForums === undefined) return

        if (!localStorage.getItem('aF')) {

            localStorage.setItem('aF', JSON.stringify(allForums));

            const forumsCompleted = allForums.filter(completed => completed.statusForum == 'REVISADO')

            const aForums = JSON.parse(localStorage.getItem('aF'));

            // Primer gráfico

            state.allForums = aForums
            state.allArray = [aForums.length, forumsCompleted.length]
            
            // Segundo gráfico
            
            const total = (forumsCompleted.length * 100) / aForums.length
            const rest = 100 - total
            state.allPercent = [total, rest]

            // Tercer gráfico

            const users = []
            const counts = {}

            for (const u of aForums) {
                if (u.userRevisor) {
                    users.push(u.userRevisor.name)
                }
            }


            Object.values(users).forEach(function (x) { counts[x] = (counts[x] || 0) + 1 })

            state.userArray = Object.keys(counts)
            state.userRepeat = Object.values(counts)

            // Cuarto gráfico

            const quality = []
            const totalAverage = []

            for (const q of aForums) {
                if (q.userRevisor) {
                    quality.push(q.calidad)
                }
            }

            const stringNumbers = Object.values(quality)
            const toNumbers = stringNumbers.map(Number)

            const add = toNumbers.reduce(function (x, y) {
                return x + y;
            }, 0)

            const totalNumbers = toNumbers.length

            const average = add / totalNumbers

            const percentAverage = 100 - average

            totalAverage.push(average, percentAverage)

            state.forumQuality = totalAverage
            
            state.statusA = 'RECIBIDOS'
            return
            
        } else {

            const forumsCompleted = allForums.filter(completed => completed.statusForum == 'REVISADO')


            const aForums = JSON.parse(localStorage.getItem('aF'));

            // Primer gráfico

            state.allForums = aForums
            state.allArray = [aForums.length, forumsCompleted.length]
            
            // Segundo gráfico
            
            const total = (forumsCompleted.length * 100) / aForums.length
            const rest = 100 - total
            state.allPercent = [total, rest]

            // Tercer gráfico

            const users = []
            const counts = {}

            for (const u of aForums) {
                if (u.userRevisor) {
                    users.push(u.userRevisor.name)
                }
            }


            Object.values(users).forEach(function (x) { counts[x] = (counts[x] || 0) + 1 })

            state.userArray = Object.keys(counts)
            state.userRepeat = Object.values(counts)

            // Cuarto gráfico

            const quality = []
            const totalAverage = []

            for (const q of aForums) {
                if (q.userRevisor) {
                    quality.push(q.calidad)
                }
            }

            const stringNumbers = Object.values(quality)
            const toNumbers = stringNumbers.map(Number)

            const add = toNumbers.reduce(function (x, y) {
                return x + y;
            }, 0)

            const totalNumbers = toNumbers.length

            const average = add / totalNumbers

            const percentAverage = 100 - average

            totalAverage.push(average, percentAverage)

            state.forumQuality = totalAverage
            state.statusA = 'RECIBIDOS'
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
        localStorage.removeItem('fC')

        if (!localStorage.getItem('fC')) {
            localStorage.setItem('fC', JSON.stringify(forumsCompleted));
            const fCompleted = JSON.parse(localStorage.getItem('fC'));
            state.forumsCompleted = fCompleted
            
            // Quinto gráfico

            const qOne = []
            const qTwo = []
            const qThree = []
            const qFour = []
            const qFive = []

            const answersRepeat = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0}

            for(const fC of forumsCompleted) {
                qOne.push(fC.question1)
            }

            for(const fC of forumsCompleted) {
                qTwo.push(fC.question2)
            }

            for(const fC of forumsCompleted) {
                qThree.push(fC.question3)
            }

            for(const fC of forumsCompleted) {
                qFour.push(fC.question4)
            }

            for(const fC of forumsCompleted) {
                qFive.push(fC.question5)
            }

            Object.values(qOne).forEach(function (x) { answersRepeat[x] = (answersRepeat[x] || 0) + 1 })
            Object.values(qTwo).forEach(function (x) { answersRepeat[x] = (answersRepeat[x] || 0) + 1 })
            Object.values(qThree).forEach(function (x) { answersRepeat[x] = (answersRepeat[x] || 0) + 1 })
            Object.values(qFour).forEach(function (x) { answersRepeat[x] = (answersRepeat[x] || 0) + 1 })
            Object.values(qFive).forEach(function (x) { answersRepeat[x] = (answersRepeat[x] || 0) + 1 })

            
            const arrayValues = Object.values(answersRepeat)

            state.answersArray = arrayValues

            // Sexto gráfico

            
            const noAnswers1 = []
            const noAnswers2 = []
            const noAnswers3 = []
            const noAnswers4 = []
            const noAnswers5 = []
            const noAnswers6 = []
            const noAnswers7 = []
            const noAnswers8 = []
            const noAnswers9 = []
            const noAnswers10 = []

            const noAnswersRepeat = []

            for(const n of forumsCompleted) {
                if(n.riesgosCriticos === 'no') {
                    noAnswers1.push(n.riesgosCriticos)
                }
            }

            for(const n of forumsCompleted) {
                if(n.riesgosCriticos === 'no') {
                    noAnswers2.push(n.controelsCriticos)
                }
            }

            for(const n of forumsCompleted) {
                if(n.riesgosCriticos === 'no') {
                    noAnswers3.push(n.cumplenControles)
                }
            }
            
            noAnswersRepeat.push(noAnswers1.length)
            noAnswersRepeat.push(noAnswers2.length)
            noAnswersRepeat.push(noAnswers3.length)
            
            console.log(noAnswersRepeat);

            state.statusA = 'RECIBIDOS'
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