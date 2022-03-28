import backendConnect from '../../../api/backend';

const state = {
    status: 'CARGANDO',
    answers: [],
    answersBox: [],
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
}

const actions = {

    async saveAnswersForum({ commit }, answersForum) {

        commit('saveAnswers', { answersForum })
        console.log(answersForum);
        return { ok: true, answersForum }

    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}