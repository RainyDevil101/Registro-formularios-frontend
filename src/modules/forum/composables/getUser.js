import { computed } from "vue";
import { useStore } from "vuex";


const getUserState = () => {

    const store = useStore();

    return {
        userIdState: computed(() => store.getters['auth/getUser']),
        position: computed(() => store.getters['auth/getPosition'])
    }
}
    export default getUserState