<template>
  <div class="up">
    <Pie :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
      :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
  </div>
</template>

<script>

import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,

} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ref } from '@vue/reactivity'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    forthChart: {
      type: Array,
      required: true
    },
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => { }
    },
        plugins: {
      type: Object ,
      default: () => []
    }
  },
  setup(props) {

    const average = ref();
    average.value = props.forthChart

    return {
      average,

      chartData: {
        labels: ['CUMPLIMIENTO DE CALIDAD', 'CALIDAD POR CUMPLIR'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651'],
            data: average.value
          }
        ]
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
         plugins: {
          tooltip: {
            enabled: false
          },
          align: 'center',
          datalabels: {
            formatter: (value, context) => {
              // console.log(value);
              const datapoints = context.chart.data.datasets[0].data;
              function totalSum(total, datapoint) {
                return total + datapoint;
              }

              const totalValue = datapoints.reduce(totalSum, 0);
              const percentageValue = (value / totalValue * 100).toFixed(1);
              const display = `${percentageValue}%`

              return display;
            }
          },
        }
      },
      plugins: [ChartDataLabels],
    }
  }
}


</script>

<style lang="scss" scoped>
</style>