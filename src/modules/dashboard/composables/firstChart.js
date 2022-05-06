import { ref } from "vue";

const firstChartData = (dates, data) => {

    const firstChartValue = ref(null);

    const initDate = ref(dates.initDate);
    const finDate = ref(dates.finDate);
    const taskName = ref(dates.taskName);
    const errorMessageFirst = ref();

    //All forums task

    const completedForums = data.filter(key => key.statusForum === 'REVISADO')



    firstChartValue.value = [data.length, completedForums.length]



    return {
        firstChartValue,
        initDate,
        finDate,
        taskName,
        errorMessageFirst,
    }

}

export default firstChartData