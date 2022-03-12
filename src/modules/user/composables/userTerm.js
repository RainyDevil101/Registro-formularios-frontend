import { computed, ref } from "vue";
import { useStore } from "vuex";

const getTerm = (term) => {
    
    const store = useStore();
    const usersRef = ref('');

    const usersTerm = (term = '') => {

        const resp = computed(() => store.getters['users/usersState'](term) )
        
        return usersRef.value = resp.value
    }

    usersTerm(term)
    

    return {
        usersTerm,
        usersRef,

        statusState: computed(() => store.getters['users/statusState']),
    }


}

export default getTerm