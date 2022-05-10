import { ref } from '@vue/reactivity';
import backendConnect from '../../../api/backend';


const createUser = () =>{
    
    const errorsUS = ref([]);
    const ok = ref(null);

    const createUserDb = async (userForm) => {

        errorsUS.value = []
        ok.value = null

        if(userForm.name === '' || userForm.mail === '' || userForm.password === '' || userForm.role === '' || userForm.task === '') {
            errorsUS.value = 'Debe completar los datos'
            ok.value = false
            return {errorsUS, ok}

            
        } else {

            if (userForm.password !== userForm.vaPassword) {
                errorsUS.value = 'La contraseña no coincide'
                ok.value = false
                return {errorsUS, ok}
            }

            const {name, mail, password, role, task, rut, position} = userForm


            try {

                const resp = await backendConnect.post('/api/users', {name, mail, password, role, task, rut, position}, {headers: { 'x-token': localStorage.getItem('token') }}).catch(function (errors){
                    
                    ok.value = false

                    if(errors.response.data.msg) { 
                        errorsUS.value = errors.response.data.msg
                        return { ok, errorsUS}
                    } 

                    if (errors.response.data.errors) {
                        
                        const msgErr = []
                        const errorsDB = errors.response.data.errors
                        for(const error of errorsDB) {
                            msgErr.push(' ' + error.msg)
                        }
                        errorsUS.value = msgErr
                        return { ok, errorsUS}
                    } else {

                        return {ok, errorsUS}
                        
                    }
                })

                console.log(resp);

                if (ok.value == null) {
                    ok.value == true
                }

                return { ok, errorsUS}
                
            } catch (error) {
                console.log(error);
            }
        }
        
    }
    
    return{
        createUserDb,
        errorsUS,
        ok

    }
}

export default createUser