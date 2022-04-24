import { computed } from 'vue'
import { useStore } from 'vuex'


const useAuth = () => {

    const store = useStore();

    const loginUser = async (user) => {

        const resp = await store.dispatch('auth/signInUser', user)
        return resp
    }

    const reForms = async (pendingsForums) => {

        const resp = await store.dispatch('forums/renoveForums', pendingsForums)
        return resp
    }
    const reCompleted = async (completedForums) => {

        const resp = await store.dispatch('forums/renoveCompleted', completedForums)
        return resp
    }
    const reAll = async (allForums) => {

        const resp = await store.dispatch('forums/renoveAll', allForums)
        return resp
    }

    const checkToken = async() => {
        const resp = await store.dispatch('auth/readToken')
        return resp
    }

    const getUsers = async() => {
        const resp = await store.dispatch('users/loadUsers')
        return resp
    }

    const getForums = async() => {
        const resp = await store.dispatch('forums/loadForums')
        return resp
    }

    const logOut = () => {
        store.commit('auth/logOut')
        store.commit('forums/logOut')
    }
    
    const resetA = () => {
        store.commit('forums/resetA')

    }
    return {
        checkToken,
        loginUser,
        logOut,
        getUsers,
        getForums,
        reForms,
        reCompleted,
        reAll,
        resetA,

        authStatus: computed(() => store.getters['auth/currentState']),
        userName: computed(() => store.getters['auth/userName'])
    }
}

export default useAuth