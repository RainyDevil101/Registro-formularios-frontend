import { ref } from "vue";
import backendConnect from '../../../api/backend';

const saveForum = () => {

    const errorsFor = ref([]);
    const forumCode = ref(null);

    const saveForumDb = async (forumNeeded) => {

        if (!forumNeeded) {
            return
        } else {
            try {
                
                const resp = await backendConnect.put(`/api/forums/${id}`, { name }, { headers: { 'x-token': localStorage.getItem('token') } }).catch(function (errors) {

                    if(errors.response.data.msg) { 
                        errorsFor.value = errors.response.data.msg
                        return {errorsFor, ok: false, message: 'Forum ya revisado'}
                    } 

                    if (errors.response.data.errors) {
                        const msgErr = []
                        const errorsDB = errors.response.data.errors
                        for(const error of errorsDB) {
                            msgErr.push(' ' + error.msg)
                            errorsFor.value = msgErr
                        }
                        return { errorsFor, ok: false, message: 'No se pudo actualizar' }
                    } else {
                        return { ok: true, message: 'Actualizado' }
                    }
                })
                return resp
            } catch (error) {
                return { message: 'Hay error en los parametros.' }

            }
        }

    }

    return {
        saveForumDb,
        errorsFor,
        forumCode,
    }
}

export default saveForum