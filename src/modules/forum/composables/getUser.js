import { computed } from "vue";
import { useStore } from "vuex";


const getUserState = () => {

    const store = useStore();

    return {
        userIdState: computed(() => store.getters['auth/getUserId']),
        position: computed(() => store.getters['auth/getPosition']),
        task: computed(() => store.getters['auth/getTask']),
        taskName: computed(() => store.getters['auth/getTaskName']),
        userRole: computed(() => store.getters['auth/userRole']),
        user: computed(() => store.getters['auth/getUser']),
    }
}
    export default getUserState