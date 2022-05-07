<template>
  <div class="up">
    <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
      :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" /> 
      <button @click="$emit('on:Rqsv')" class="btn my-2 btn-primary">RQSV</button>
      </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { ref } from '@vue/reactivity'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },

  emits: ['on:Rqsv'],

  props: {
    fifthChart: {
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

    const answers = ref();
    answers.value = props.fifthChart

    return {
      chartData: {
        labels: [
          'RQSV N°1',
          'RQSV N°2',
          'RQSV N°3',
          'RQSV N°4',
          'RQSV N°5',
          'RQSV N°6',
          'RQSV N°10',
          'RQSV N°15',
          'RQSV N°18',
          'RQSV N°20',
        ],
        datasets: [
          {
            label: 'CANTIDAD DE RC VINCULADOS',
            backgroundColor: ['#1c7293'],
            data: answers.value
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