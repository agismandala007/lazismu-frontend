<template>
  <Doughnut
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
  />
</template>

<script>
import { Doughnut } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, DoughnutController, ArcElement)

export default {
  name: 'DoughnatChart',
  components: {
    Doughnut,
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 200,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    chartOptions: {
      type: Object,
      default: () => {}
    },
    chartData: {
      type: Object,
      default: () =>{}
    }
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: [
              '#15A5BE',
              '#a91123',
              '#172b4d',
              '#fb6340',
              '#a3c7c9',
              '#3F3B61',
            ],
            data: [10, 40, 39, 80, 40],
          },
        ],
      },
      chartOptions: {
        borderRadius: 10,
        cutout: '60%',
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateRotate: false,
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
          
        },
      },
    }
  },
}
</script>
