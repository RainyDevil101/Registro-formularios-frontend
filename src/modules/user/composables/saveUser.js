import { ref } from "vue";
import backendConnect from '../../../api/backend';

const saveUser = () => {

    const errorsUS = ref([]);

    const saveUserDb = async (save, selected, stor, id) => {
        if(!save || !id || !selected || !stor) {
            return { ok: false, message: 'No se pudo actualizar' }
        } else {

            if (save.password !== save.vaPassword) {
                errorsUS.value = 'La contraseña no coincide'
                return {errorsUS, ok: false}
            }

            try {
                const storage = stor
                const role = selected
                const {name, mail, password } = save
                const resp = await backendConnect.put(`/api/users/${id}`, { name, mail, role, password, storage }, { headers: { 'x-token': localStorage.getItem('token') } }).catch(function(errors){
                    
                    
                    if (errors.response.data.msg) {
                        errorsUS.value = errors.response.data.msg
                        return {errorsUS, ok: false, message: 'Usuario ya existe' }
                    }
                    if (errors.response.data.errors) {
                        const msgErr = []
                        const errorsDB = errors.response.data.errors
                        for(const error of errorsDB) {
                            msgErr.push(' ' + error.msg)
                            errorsUS.value = msgErr
                        }
                        return {errorsUS, ok: false, message: 'No se pudo actualizar'}
                    } else {
                        return {ok: true, message: 'Actualizado'}
                    }
                })
                return resp
            } catch (error) {
                return {message: 'Hay error en los parametros.'}
                
            }
        }
        
    }

    return {
        saveUserDb,
        errorsUS
    }
}

export default saveUser