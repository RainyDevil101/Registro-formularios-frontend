import { ref } from "vue";
import backendConnect from '../../../api/backend';
import getDayMonthYear from '../../../helpers/DateFormat';
import shortingText from '../../../helpers/shortingText';

const useIdForum = (forumId = '') => {

    const forum = ref(null);
    const userName = ref(null);
    const userPosition = ref(null);
    const userTask = ref(null);
    const userControl = ref(null);
    const userControlRe = ref(null);
    const errorMessage = ref(null);
    const isLoading = ref(true);
    const userAn = ref(null);
    const userRe = ref(null);
    const onLoad = ref(true);
    // const shortingText = ref(null);
    const userObligation = ref(null);

    const manDay = ref(null);
    const manMonth = ref(null);
    const manYearDay = ref(null);
    // const manMin = ref(null);
    // const manHour = ref(null);

    const acDay = ref(null);
    const acMonth = ref(null);
    const acYearDay = ref(null);
    const acMin = ref(null);
    const acHour = ref(null);

    const searchForum = async(id) => {

        if(!id) return

        forum.value = ('')
        isLoading.value = true

        try {

            const {data} = await backendConnect.get(`/api/forums/${id}`, {
                headers: { 'x-token': localStorage.getItem('token') }
            })

            if(data === null) {
                return errorMessage.value = 'No se pudo cargar el formulario.'
            }
            
            forum.value = data
            userName.value = data.user.name
            userPosition.value = data.position.name
            userTask.value = data.task.name
            userAn.value = data.imgAn
            userRe.value = data.imgRe
            
            manDay.value = data.dayList
            manMonth.value = data.monthList
            manYearDay.value = data.yearList

            const { shorterText } = shortingText(data.obligation);

            userObligation.value = shorterText
            
            // const manDate = new Date (data.dateAc)
            
            // manMin.value = manDate.getMinutes();
            // manHour.value = manDate.getHours();

            const acDate = new Date (data.date)

            acMin.value = acDate.getMinutes();
            acHour.value = acDate.getHours();
            
            const { dayAc, monthAc, yearDayAc } = getDayMonthYear(data.dateAc)

            acDay.value = dayAc
            acMonth.value = monthAc
            acYearDay.value = yearDayAc

            errorMessage.value = false
            onLoad.value = false

            if ( data.controls === true ) {
                userControl.value = 'Si'
                userControlRe.value = data.postControl
                return
            }

            if ( data.controls === false ) {
                userControl.value = 'No'
                userControlRe.value = false
                return
            } else {
                console.log('Error de pregunta');
            }


            
        } catch (error) {
            console.log('pepe');
            if(error.response.data)
            errorMessage.value = true
        }
        errorMessage.value = true
        onLoad.value = false

    }

    searchForum(forumId)

    return {
        forum,
        userName,
        errorMessage,
        searchForum,
        isLoading,
        userPosition,
        userTask,
        userControl,
        userControlRe,
        userAn,
        userRe,
        onLoad,
        userObligation,

        manDay,
        manMonth,
        manYearDay,
        
        acDay,
        acMonth,
        acYearDay,
        acMin,
        acHour,
    }

}

export default useIdForum