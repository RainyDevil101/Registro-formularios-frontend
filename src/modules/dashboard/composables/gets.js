import { computed } from 'vue'
import { useStore } from 'vuex'


const getForms= () => {

    const store = useStore();

    return {

        statusStateA: computed(() => store.getters['forums/statusStateA']),
    }
}

export default getForms