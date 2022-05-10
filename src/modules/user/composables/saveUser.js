import { ref } from "vue";
import backendConnect from '../../../api/backend';

const saveUser = () => {

    const errorsUS = ref([]);
    const ok = ref(null);

    const saveUserDb = async (save, selected, taskUId, id) => {

        errorsUS.value = []
        console.log('a');
        if(!save || !id || !selected || !taskUId) {
            ok.value = false
            errorsUS.value = 'No se pudo actualizar'
            console.log('b');
            return { ok, errorsUS }
        } else {
            console.log('c');
            if (save.password !== save.vaPassword) {
                ok.value = false
                errorsUS.value = 'La contraseña no coincide'
                console.log('d');
                return { ok, errorsUS }
            }
            console.log('e');
            try {
                const task = taskUId.join()
                const role = selected
                const {name, mail, password, rut } = save
                console.log('f');
                const resp = await backendConnect.put(`/api/users/${id}`, { name, mail, role, password, task, rut }, { headers: { 'x-token': localStorage.getItem('token') } })
                
                ok.value = true
                errorsUS.value = false

                console.log(resp);
                
                return { ok, errorsUS }
            } catch (errors) {



                ok.value = false
                    
                    if (errors.response.data.msg) {
                        errorsUS.value = errors.response.data.msg
                        return { ok, errorsUS }
                    }
                    if (errors.response.data.errors) {
                        const msgErr = []
                        const errorsDB = errors.response.data.errors
                        for(const error of errorsDB) {
                            msgErr.push(' ' + error.msg)
                        }
                        errorsUS.value = msgErr
                        return { ok, errorsUS }
                    } else {
                        console.log(errors);
                        return {ok}
                    }

                
            }
        }
        
    }

    return {
        saveUserDb,
        errorsUS,
        ok,
    }
}

export default saveUser