<template>
  <div class="up">
    <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
      :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
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
      default: 400
    },
    height: {
      type: Number,
      default: 400
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
  data() {
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
            label: 'CANTIDAD DE RC VINCULADOS A LA HERRAMIENTA PREVENTIVA',
            backgroundColor: ['#1c7293'],
            data: [2, 1, 3, 5, 6, 40, 20, 15, 9, 4]
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