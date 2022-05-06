<template>
  <div class="up">
    <Doughnut :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
      :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    secondChart: {
      type: Array,
      required: true,
    },
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
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
      type: Object,
      default: () => []
    }
  },
  setup(props) {

    const percentC = ref();
    percentC.value = props.secondChart

    return {

      chartData: {
        labels: ['REGISTROS REVISADOS', 'REGISTROS POR REVISAR'],
        datasets: [{
          data: percentC.value,
          backgroundColor: ['rgb(153, 102, 255)', 'rgb(255, 206, 86)']
        }]
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
.aColor {
  background-color: red;
}

.bColor {
  background-color: blue;
}
</style>