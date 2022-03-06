import { ref } from "vue";
import backendConnect from '../../api/backend';

const getTask = () => {

    const tasks = ref([]);

    const searchTask = async () => {
        
        const {data} = await backendConnect.get('/api/tasks', {
            headers: { 'x-token': localStorage.getItem('token') }
        })
        const tasksArray = []
        const tasksDB = data.tasks
        for(const task of tasksDB) {
            tasksArray.push(task)
            tasks.value = tasksArray
        }
        return {tasks, ok: true}
    }

    searchTask()

    return {
        tasks,
        searchTask,
    }
}

export default getTask