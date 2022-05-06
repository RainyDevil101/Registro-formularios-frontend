import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { cloneDeep } from 'lodash'
import chartData from './chartData';


const getForms = (dates = {
    initDate: "",
    finDate: "",
    taskSearch: "",
}) => {

    const store = useStore();
    const gettingDate = ref(dates)
    const firstChart = ref(null);
    const secondChart = ref(null);
    const thirdChart = ref(null);
    const forthChart = ref(null);
    const fifthChart = ref(null);
    const sixChart = ref(null);
    const sevenChart = ref(null);
    const errorMessage = ref(false);

    const chartValues = (gettingDate) => {

        
        if (!gettingDate) return
        
        const dataFormated = cloneDeep(gettingDate)
        
        const resp = computed(() => store.getters['forums/gettingData'](dataFormated));

        const data = resp.value

        const { allForums } = data

        const { firstChartValue, secondChartValue, thirdChartValue, forthChartValue, fifthChartValue, sixChartValue, sevenChartValue, errorMessages } = chartData(allForums);
        
        firstChart.value = firstChartValue.value
        secondChart.value = secondChartValue.value
        thirdChart.value = thirdChartValue.value
        forthChart.value = forthChartValue.value
        fifthChart.value = fifthChartValue.value
        sixChart.value = sixChartValue.value
        sevenChart.value = sevenChartValue.value
        errorMessage.value = errorMessages.value

        console.log();

        return;

    };

    chartValues(gettingDate.value);

    return {
        chartValues,
        firstChart,
        secondChart,
        thirdChart,
        forthChart,
        fifthChart,
        gettingDate,
        sixChart,
        sevenChart,
        errorMessage,

        statusStateA: computed(() => store.getters['forums/statusStateA']),
    };
};

export default getForms