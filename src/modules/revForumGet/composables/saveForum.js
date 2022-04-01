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

                    if (errors.response.data.msg) {
                        errorsFor.value = errors.response.data.msg
                        return { errorsFor, ok: false, message: 'Forum ya revisado' }
                    }

                    if (errors.response.data.errors) {
                        const msgErr = []
                        const errorsDB = errors.response.data.errors
                        for (const error of errorsDB) {
                            msgErr.push(' ' + error.msg)
                            errorsFor.value = msgErr
                        }
                        return { errorsFor, ok: false, message: 'No se pudo actualizar' }
                    } else {
                        return { ok: true, message: 'Actualizado' }
                    }
                })
                const { data } = resp

                code.value = data.code

                console.log(code.value);

                return { ok: true, code }
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
        code,
    }
}

export default saveForum