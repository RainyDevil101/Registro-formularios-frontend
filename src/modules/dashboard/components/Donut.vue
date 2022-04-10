<template>
  <div class="up">
    <Doughnut 
          :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

import { defineComponent, h, PropType } from 'vue'
import { ref } from '@vue/reactivity';
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)


export default defineComponent({
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
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
      default: () => {}
    },
    plugins: {
      type: Object ,
      default: () => []
    }
  },
  setup() {



    return {

      chartData: {
        labels: ['REVISADOS', 'POR REVISAR'],
        datasets: [{ data: [23,10],
        backgroundColor: ['rgb(153, 102, 255)', 'rgb(255, 206, 86)']
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      }

    }

  }
})
</script>

<style lang="scss" scoped>
.aColor {
  background-color: red;
}

.bColor {
  background-color: blue;
}
</style>