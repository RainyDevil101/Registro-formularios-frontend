import { ref } from "vue";
import backendConnect from '../../api/backend';

const getRoles = () => {
    
    const roles = ref([])
    
    const searchRoles = async () => {

        const {data} = await backendConnect.get('/api/roles', {
            headers: { 'x-token': localStorage.getItem('token') }
        })
        const rolesArray = []
        const rolesDB = data.roles
        for(const role of rolesDB) {
            rolesArray.push(role)
            roles.value = rolesArray
        }
        return {roles, ok: true}
    }
    searchRoles()

    return {
        roles,
        searchRoles,
    }
}

export default getRoles