import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import firstChartData from './firstChart';


const getForms= () => {

    const store = useStore();
    const testing = ref();

    const getAllArray = (dates = '') => {

        console.log(dates);

        const data = computed(() => store.getters['forums/gettingData']);

        const { test } = firstChartData(dates, data.value);

        const firstChart = test

        console.log(firstChart);

        return { firstChart };

    }

    return {
        getAllArray,
        testing,

        statusStateA: computed(() => store.getters['forums/statusStateA']),
    };
};

export default getForms