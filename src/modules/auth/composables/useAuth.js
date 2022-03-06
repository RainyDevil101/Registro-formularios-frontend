import { computed } from 'vue'
import { useStore } from 'vuex'


const useAuth = () => {

    const store = useStore();

    const loginUser = async (user) => {

        const resp = await store.dispatch('auth/signInUser', user)
        return resp
    }

    const checkToken = async() => {
        const resp = await store.dispatch('auth/readToken')
        return resp
    }

    const logOut = () => {
        store.commit('auth/logOut')
    }

    return {
        checkToken,
        loginUser,
        logOut,

        authStatus: computed(() => store.getters['auth/currentState']),
        userName: computed(() => store.getters['auth/userName'])
    }
}

export default useAuth