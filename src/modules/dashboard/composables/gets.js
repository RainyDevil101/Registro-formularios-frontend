import { computed, ref } from 'vue'
import { useStore } from 'vuex'


const getForms= () => {

    const store = useStore();
    const totalAllArray = ref();

    const getAllArray = (dates = '') => {

        const resp = computed(() => store.getters['forums/allArray'](dates))
        
        totalAllArray.value = resp.value 

        return { totalAllArray }

    }

    return {
        getAllArray,
        totalAllArray,

        statusStateA: computed(() => store.getters['forums/statusStateA']),
    }
}

export default getForms