<template>
  <div class="up">
    <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
      :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" /> 
      <button @click="$emit('on:Questions')" class="btn my-2 btn-primary">PREGUNTAS</button>
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

  emits: ['on:Questions'],

  props: {
    sixChart: {
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

    const noAnswers = ref();
    noAnswers.value = props.sixChart

    return {

      noAnswers,

      chartData: {
        labels: [
          'PREGUNTA 1',
          'PREGUNTA 2',
          'PREGUNTA 3',
          'PREGUNTA 4',
          'PREGUNTA 5',
          'PREGUNTA 6',
          'PREGUNTA 7',
          'PREGUNTA 8',
          'PREGUNTA 9',
        ],
        datasets: [
          {
            label: '"NO" POR RESPUESTAS REVISADAS',
            backgroundColor: ['#D5D6AA'],
            data: noAnswers.value
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