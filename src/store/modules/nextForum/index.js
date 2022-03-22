import backendConnect from '../../../api/backend';

const state = {
    status: 'CARGANDO',
    answers: [],
    answersBox: [],
    forum: '',

}

const getters = {

    nextStatus(state, getters, rootState) {
        return state.status
    },
    nextAnswers(state, getters, rootState) {
        return state.answers
    },
    nextBox(state, getters, rootState) {
        return state.answersBox
    },
    getForum(state, getters, rootState) {
        return state.forum
    },
}

const mutations = {

    saveAnswers(state, { answersForum }) {

        state.answers = answersForum
        state.status = 'RECIBIDO'

    },
    saveBox(state, { boxForum }) {

        state.answersBox = boxForum
        state.status = 'RECIBIDO'

    },
    saveForum(state, { revForum }) {

        state.forum = revForum

    },

}

const actions = {
   
    async saveForum({ commit }, revForum) {

        commit('saveForum', {revForum})

        return {  ok: true }

    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}