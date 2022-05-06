import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import firstChartData from './firstChart';


const getForms = (dates = {
    initDate: "",
    finDate: "",
    taskSearch: "",
}) => {

    const store = useStore();
    const gettingDate = ref(dates)
    const firstChart = ref(null);
    const secondChart = ref(null);
    const errorMessage = ref();

    const firstChartValues = (gettingDate) => {

        if (!gettingDate) return

        const resp = computed(() => store.getters['forums/gettingData'](gettingDate));

        const data = resp.value

        const { allForums } = data

        // console.log(allForums);

        const { firstChartValue, errorMessageFirst } = firstChartData(gettingDate, allForums);

        firstChart.value = firstChartValue.value

        return;

    };

    const secondChartValues = (gettingDate) => {


        if (!gettingDate) return

        // const data = computed(() => store.getters['forums/gettingData']);

        // const { firstChartValue, errorMessageFirst } = firstChartData(gettingDate, data.value);

        return;

    };

    firstChartValues(gettingDate.value);
    secondChartValues(gettingDate.value);

    return {
        firstChartValues,
        firstChart,
        secondChartValues,
        secondChart,
        gettingDate,

        statusStateA: computed(() => store.getters['forums/statusStateA']),
    };
};

export default getForms