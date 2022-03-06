import { ref } from "vue";
import supplierApi from "../../api/supplierApi";

const getStorages = () => {
    
    const storages = ref([])
    
    const searchStorages = async () => {

        const {data} = await supplierApi.get('/api/storages', {
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