<template>
  <div  class="up">
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

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'DoughnutChart',
  components: {
    Doughnut
  },
  props: {
    allPercent: {
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
      default: () => {}
    },
    plugins: {
      type: Object ,
      default: () => []
    }
  },
  setup(props) {

    const percentC = ref();
    percentC.value = props.allPercent

    return {

      chartData: {
        labels: ['REGISTROS REVISADOS %', 'REGISTROS POR REVISAR %'],
        datasets: [{ data: percentC.value,
        backgroundColor: ['rgb(153, 102, 255)', 'rgb(255, 206, 86)']
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      }

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