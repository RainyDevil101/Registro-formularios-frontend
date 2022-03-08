import { ref } from "vue";
import backendConnect from '../../../api/backend';

const getTerm = (term = "") => {

    const userRef = ref([]);

    const searchTerm = async (term) => {

        if(term.length === 0) {
            const {data} = await backendConnect.get('/api/users', {
                headers: { 'x-token': localStorage.getItem('token') }
            })
            const {users} = data
            return userRef.value = users

        } else {
            const {data} = await backendConnect.get(`/api/search/users/${term}`, {
                headers: { 'x-token': localStorage.getItem('token') }
            })
            const {results} = data
            return userRef.value = results
        }

    }

    searchTerm(term)

    return{
        searchTerm,
        userRef,
    }
}

export default getTerm