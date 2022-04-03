import { computed, ref } from "vue";
import { useStore } from "vuex";

const getTerm = (term) => {
    
    const store = useStore();
    const forumsRef = ref('');
    const forumsCompletedRef = ref('');

    const forumsTerm = (term = '') => {

        const resp = computed(() => store.getters['forums/forumsState'](term) )

        return forumsRef.value = resp.value
    }
    const forumsCompletedTerm = (term = '') => {

        const resp = computed(() => store.getters['forums/forumsStateCompleted'](term) )

        return forumsCompletedRef.value = resp.value
    }

    forumsTerm(term)

    forumsCompletedTerm(term)
    

    return {
        forumsTerm,
        forumsCompletedTerm,
        forumsRef,
        forumsCompletedRef,

        statusState: computed(() => store.getters['forums/statusState']),
        completedState: computed(() => store.getters['forums/completedState']),
    }


}

export default getTerm