import { ref } from "vue";
import backendConnect from '../../api/backend';

const getUbi = () => {

    const ubications = ref([]);

    const searchUbi = async () => {
        
        const {data} = await backendConnect.get('/api/ubications', {
            headers: { 'x-token': localStorage.getItem('token') }
        })
        const ubicationsArray = []
        const ubicationsDB = data.ubications
        for(const ubication of ubicationsDB) {
            ubicationsArray.push(ubication)
            ubications.value = ubicationsArray
        }
        return {ubications, ok: true}
    }

    searchUbi()

    return {
        ubications,
        searchUbi,
    }
}

export default getUbi