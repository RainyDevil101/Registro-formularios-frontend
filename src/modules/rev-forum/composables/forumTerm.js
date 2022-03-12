import { computed, ref } from "vue";
import { useStore } from "vuex";

const getTerm = (term) => {
    
    const store = useStore();
    const forumsRef = ref('');

    const forumsTerm = (term = '') => {

        const resp = computed(() => store.getters['forums/forumsState'](term) )
        
        return forumsRef.value = resp.value
    }

    forumsTerm(term)
    

    return {
        forumsTerm,
        forumsRef,

        statusState: computed(() => store.getters['forums/statusState']),
    }


}

export default getTerm