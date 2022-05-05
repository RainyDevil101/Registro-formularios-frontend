import { ref } from "vue";

const firstChartData = ( dates, data ) => {
    
    const firstChartValue = ref(null);

    const initDate = ref(dates.initDate);
    const finDate = ref(dates.finDate);
    const taskSearch = ref(dates.taskSearch);
    const errorMessageFirst = ref();

    //All forums

    const completed = []
    const pending = []

    
    for (const key of data) {
        if (key.statusForum === 'PENDIENTE') {
            completed.push(key)
        } else {
            pending.push(key)
        }
    }
    
    //All forums task

    const allTask = data.filter(key => key.task.name === taskSearch.value)

    console.log(allTask);

    // const allForums = data


    if (initDate.value === '' && finDate.value === '' && taskSearch.value === '') {

        firstChartValue.value = [data.length, completed.length]

    }

    if (initDate.value === '' && finDate.value === '' && taskSearch.value) {

        firstChartValue.value = 'aa'

    }

    return {
        firstChartValue,
        initDate,
        finDate,
        taskSearch,
        errorMessageFirst,
    }

}

export default firstChartData