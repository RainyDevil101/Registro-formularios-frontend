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

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
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
      type: Array,
      default: () => []
    }
  },
  setup() {


    return {

      chartData: {
        labels: ['CUMPLIDA', 'POR CUMPLIR'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651'],
            data: [40, 20]
          }
        ]
      },

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },

    }
  }
}


</script>

<style lang="scss" scoped>
</style>