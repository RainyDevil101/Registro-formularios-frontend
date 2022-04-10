<template>
  <div class="up">
    <Doughnut />
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
  CategoryScale,
  Plugin
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
      type: Array ,
      default: () => []
    }
  },
  setup(props) {
    const chartData = {
      labels: ['REVISADOS', 'POR REVISAR'],
      datasets: [
        {
          backgroundColor: ['#41B883', '#E46651'],
          data: [40, 20]
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return () =>
      h(Doughnut, {
        chartData,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins
      })
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