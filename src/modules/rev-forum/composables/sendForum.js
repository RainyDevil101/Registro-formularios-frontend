import { ref } from "vue";
import backendConnect from '../../../api/backend';

const sendFor = () => {

    const errors = ref([]);

    const createForum = async (userForm, imgAn, imgRe) => {

        console.log(imgAn);

        if( userForm.dateAc === '' || userForm.name === '' || userForm.run === '' || userForm.position === '' || userForm.task === '' || userForm.obligation === '' || userForm.question1 === '' || userForm.question2 === '' || userForm.question3 === '' || userForm.question4 === '' || userForm.question5 === '' || userForm.controls === '' || imgAn === undefined || imgRe === undefined ) {
            errors.value = 'Debe llenar los campos'
            return { errors, ok: false }
        } else {

            const {  dateAc, name, run, position, task, obligation, question1, question2, question3, question4, question5, controls, postControl} = userForm

            imgAn

            imgRe

            try {

                const resp = await backendConnect.post('/api/forums', {  dateAc, name, run, position, task, obligation, question1, question2, question3, question4, question5, controls, postControl, imgAn, imgRe }, 
                {headers: { 'x-token': localStorage.getItem('token') }}).catch(function (errors) {

                    if(errors.response.data.msg) {
                        errors.value = errors.response.data.msg
                        return {errors, ok: false}
                    }
                    if(errors.response.data.errors) {
                        const msgErr = []
                        const errorsDB = errors.response.data.errors
                        for(const error of errorsDB) {
                            msgErr.push(' ' + error.msg)
                            errors.value = msgErr
                        }
                        return {errors, ok: false}
                    } else {
                        return {ok: true}
                    }
                })
                return resp
            } catch (error) {

                console.log(error);
                
            }

        }

    }

    return {
        errors,
        createForum
    }
}

export default sendFor