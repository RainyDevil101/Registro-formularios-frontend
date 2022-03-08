import { ref } from "vue";
import backendConnect from '../../api/backend';

const getStorages = () => {
    
    const storages = ref([])
    
    const searchStorages = async () => {

        const {data} = await backendConnect.get('/api/storages', {
            headers: { 'x-token': localStorage.getItem('token') }
        })
        const storagesArray = []
        const storagesDB = data.storages
        for(const storage of storagesDB) {
            storagesArray.push(storage)
            storages.value = storagesArray
        }
        return {storages, ok: true}
    }
    searchStorages()

    return {
        storages,
        searchStorages,
    }
}

export default getStorages