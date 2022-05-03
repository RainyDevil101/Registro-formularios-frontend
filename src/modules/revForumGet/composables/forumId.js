import { ref } from "vue";
import useFormStore from "./getForum";
import getDayMonthYear from '../../../helpers/DateFormat';
import shortingText from '../../../helpers/shortingText';

const useIdForum = () => {

    const { userNeeded } = useFormStore();

    const forum = ref(null);
    const userName = ref(null);
    const userPosition = ref(null);
    const userTask = ref(null);
    const userControl = ref(null);
    const userControlRe = ref(null);
    const errorMessage = ref(null);
    const userAn = ref(null);
    const userRe = ref(null);
    const onLoad = ref(true);
    // const shortingText = ref(null);
    const userObligation = ref(null);
    const forumEmpty = ref(false);

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

    const searchForum = async(userNeeded) => {

        if (userNeeded.value == '' || userNeeded.value === null) return

        forum.value = ('')
        onLoad.value = true

        const a = userNeeded.value

        const data = a[0]

        try {

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
                return
            }


            
        } catch (error) {
            if(error.response.data)
            errorMessage.value = true
        }
        errorMessage.value = true
        onLoad.value = false

    }

    searchForum(userNeeded)

    return {
        forum,
        userName,
        errorMessage,
        searchForum,
        userPosition,
        userTask,
        userControl,
        userControlRe,
        userAn,
        userRe,
        onLoad,
        userObligation,
        forumEmpty,

        manDay,
        manMonth,
        manYearDay,
        
        acDay,
        acMonth,
        acYearDay,
        acMin,
        acHour,
        userNeeded,
    }

}

export default useIdForum