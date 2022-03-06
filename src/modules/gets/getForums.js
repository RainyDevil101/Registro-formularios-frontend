import { ref } from "vue";
import backendConnect from '../../api/backend';

const getForums = (term) => {

    const forumRef = ref([]);
    const onLoad = ref(true);

    const searchForum = async (term) => {

            if(term.length === 0) {
                const {data} = await backendConnect.get('/api/forums', {
                    headers: { 'x-token': localStorage.getItem('token') }
                })
                const {forums} = data
                forumRef.value = forums
                onLoad.value = false
                return

            } else {
                const {data} = await backendConnect.get(`/api/search/forums/${term}`, {
                    headers: { 'x-token': localStorage.getItem('token') }
                })
                const {results} = data
                forumRef.value = results
                onLoad.value = false
                return
            }
    }

    searchForum(term)

    return{
        searchForum,
        forumRef,
        onLoad,
    }
}

export default getForums