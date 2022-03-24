import { computed, ref } from 'vue'
import { useStore } from 'vuex'


const useFormStore = () => {

    const store = useStore();

    const getForm = async (id) => {

        const resp = await store.dispatch('forums/getForum', id)
        console.log(resp);
        return resp

    }

    // const checkToken = async() => {
    //     const resp = await store.dispatch('auth/readToken')
    //     return resp
    // }

    // const getUsers = async() => {
    //     const resp = await store.dispatch('users/loadUsers')
    //     return resp
    // }

    // const getForums = async() => {
    //     const resp = await store.dispatch('forums/loadForums')
    //     return resp
    // }

    // const logOut = () => {
    //     store.commit('auth/logOut')
    // }

    return {
        getForm,

        userNeeded: computed(() => store.getters['forums/getForumNeeded']),

        // authStatus: computed(() => store.getters['auth/currentState']),
        // userName: computed(() => store.getters['auth/userName'])
    }
}

export default useFormStore