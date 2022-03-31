import { ref } from "vue";
import backendConnect from '../../../api/backend';

const saveForum = () => {

    const errorsFor = ref([]);
    const forumCode = ref(null);
    const ok = ref(null);

    const saveForumDb = async (forumNeeded, userForm) => {

        console.log(forumNeeded[0], 'a');
        console.log(userForm, 'b');

        if (!forumNeeded || userForm) {
            return
        } else {
            try {

                // const resp = await backendConnect.put(`/api/forums/${id}`, {  }, { headers: { 'x-token': localStorage.getItem('token') } }).catch(function (errors) {

                //     if(errors.response.data.msg) { 
                //         errorsFor.value = errors.response.data.msg
                //         return {errorsFor, ok: false, message: 'Forum ya revisado'}
                //     } 

                //     if (errors.response.data.errors) {
                //         const msgErr = []
                //         const errorsDB = errors.response.data.errors
                //         for(const error of errorsDB) {
                //             msgErr.push(' ' + error.msg)
                //             errorsFor.value = msgErr
                //         }
                //         return { errorsFor, ok: false, message: 'No se pudo actualizar' }
                //     } else {
                //         return { ok: true, message: 'Actualizado' }
                //     }
                // })
                // return resp
            } catch (error) {
                return { message: 'Hay error en los parametros.' }

            }
        }

    }

    return {
        saveForumDb,
        errorsFor,
        forumCode,
        ok,
    }
}

export default saveForum