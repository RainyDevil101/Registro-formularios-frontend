import { ref } from "vue";
import backendConnect from '../../api/backend';

const getPosit = () => {

    const positions = ref([]);

    const searchPosit = async () => {
        
        const {data} = await backendConnect.get('/api/positions', {
            headers: { 'x-token': localStorage.getItem('token') }
        })
        const positionsArray = []
        const positionsDB = data.positions
        for(const position of positionsDB) {
            positionsArray.push(position)
            positions.value = positionsArray
        }


        return {positions, ok: true}
    }

    searchPosit()

    return {
        positions,
        searchPosit,
    }
}

export default getPosit