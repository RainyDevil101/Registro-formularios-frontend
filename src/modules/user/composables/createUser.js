import { ref } from '@vue/reactivity';
import backendConnect from '../../../api/backend';


const createUser = () =>{
    
    const errorsUS = ref([]);

    const createUserDb = async (userForm) => {
        console.log(userForm);

        if(userForm.name === '' || userForm.mail === '' || userForm.password === '' || userForm.role === '' || userForm.storage === '') {
            errorsUS.value = 'Debe completar los datos'
            return {errorsUS, ok: false}

            
        } else {

            if (userForm.password !== userForm.vaPassword) {
                errorsUS.value = 'La contraseña no coincide'
                return {errorsUS, ok: false}
            }

            const {name, mail, password, role, storage, rut, position} = userForm


            try {

                const resp = await backendConnect.post('/api/users', {name, mail, password, role, storage, rut, position}, {headers: { 'x-token': localStorage.getItem('token') }}).catch(function (errors){
                    
                    if(errors.response.data.msg) { 
                        errorsUS.value = errors.response.data.msg
                        return {errorsUS, ok: false, message: 'Usuario ya existe'}
                    } 

                    if (errors.response.data.errors) {
                        
                        const msgErr = []
                        const errorsDB = errors.response.data.errors
                        for(const error of errorsDB) {
                            msgErr.push(' ' + error.msg)
                            errorsUS.value = msgErr
                        }

                        return {errorsUS, ok: false, message: 'No se pudo crear'}
                    } else {
                        return { ok: true, message: 'Creado'}
                        
                    }
                })
                return resp
                
            } catch (error) {
                console.log(error);
            }
        }
        
    }
    
    return{
        createUserDb,
        errorsUS

    }
}

export default createUser