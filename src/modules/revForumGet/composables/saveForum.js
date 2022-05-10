import { ref } from "vue";
import backendConnect from '../../../api/backend';

const saveForum = () => {

    const errorsFor = ref([]);
    const forumCode = ref(null);
    const ok = ref(null);
    const code = ref(null);

    const saveForumDb = async (forumNeeded, userForm, calidadR, si) => {


        if (!forumNeeded || !userForm) {
            errorsFor.value = 'Datos no completados'
            return { ok: false }
        } else {

            const riesgosCriticos = userForm.questionOne
            const controlesCriticos = userForm.questionTwo
            const cumplenControles = userForm.questionThree
            const trabControles = userForm.questionFour
            const contestaronPreguntas = userForm.questionFive
            const todosTrabajadores = userForm.questionSix
            const todosIntegrantes = userForm.questionSeven
            const supervisorTitular = userForm.questionEight
            const fueronCorregidas = userForm.questionNine
            const { oportunidadesEncontradas, fortalezaODP, statusForum } = userForm

            const calidad = calidadR.value

            const yesCounter = si

            const id = forumNeeded[0]._id

            try {

                const resp = await backendConnect.put(`/api/forums/${id}`, { riesgosCriticos, controlesCriticos, cumplenControles, trabControles, contestaronPreguntas, todosTrabajadores, todosIntegrantes, supervisorTitular, fueronCorregidas, oportunidadesEncontradas, fortalezaODP, yesCounter, calidad, statusForum }, { headers: { 'x-token': localStorage.getItem('token') } }).catch(function (errors) {

                    console.log(resp);
                    if (errors.response.data.msg) {
                        errorsFor.value = errors.response.data.msg
                        ok.value = false
                        code.value = null
                        return { errorsFor, ok, code}
                    }

                    if (errors.response.data.errors) {
                        const msgErr = []
                        const errorsDB = errors.response.data.errors
                        for (const error of errorsDB) {
                            msgErr.push(' ' + error.msg)
                        }
                        errorsFor.value = msgErr
                        code.value = null
                        ok.value = false
                        return { errorsFor, ok, code }
                    } else {
                        ok.value = true
                        code.value = resp.data.code
                        errorsFor.value = false
                        return { errorsFor, ok, code }
                    }
                })

                errorsFor.value = false
                code.value = resp.data.code
                ok.value = true
                return { errorsFor, ok, code}
            } catch (error) {


            }
        }
        
    }

    return {
        saveForumDb,
        errorsFor,
        forumCode,
        ok,
        code,
    }
}

export default saveForum

