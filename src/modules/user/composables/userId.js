import { ref } from "vue";
import backendConnect from '../../../api/backend';

const useIdUser = (userId = '') => {

    const user = ref();
    const userRole = ref();
    const userStorage = ref();
    const userTask = ref();
    const errorMessage = ref();
    const isLoading = ref(true);

    const searchUser = async(id) => {

        if(!id) return

        user.value = ('')
        isLoading.value = true

        try {

            const {data} = await backendConnect.get(`/api/users/${id}`, {
                headers: { 'x-token': localStorage.getItem('token') }
            })
            if(data === null) {
                return errorMessage.value = 'No se pudo cargar la información.'
            }
            user.value = data
            userRole.value = data.role
            userStorage.value = data.storage.name
            userTask.value = data.task.name

            errorMessage.value = null
            
        } catch (error) {
            errorMessage.value = 'No se pudo cargar el cargo.'
        }
        isLoading.value = false

    }

    searchUser(userId)

    return {
        user,
        errorMessage,
        searchUser,
        isLoading,
        userRole,
        userStorage,
        userTask,
    }

}

export default useIdUser