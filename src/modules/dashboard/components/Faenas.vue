<template>
  <div class="up">
    <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
      :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { ref } from '@vue/reactivity'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    sevenChart: {
      type: Object,
      required: true,
    },
    chartId: {
      type: String,
      default: 'bar-chart'
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
      default: () => { }
    }
  },
  setup(props) {

    const taskForm = ref();
    taskForm.value = props.sevenChart

    return {
      taskForm,

      chartData: {
        labels: [
          'DET',
          'DAND',
          'DFV',
          'DSAL',
          'DCH',
          'SDAND',
          'SDET',
          'CASA MATRÍZ',
        ],
        datasets: [
          {
            label: 'CANTIDAD ART POR FAENA',
            backgroundColor: ['#E75A7C'],
            data: taskForm.value
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>