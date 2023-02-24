<template>
  <section>
    <div>
      <LineChartGenerator
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
  </section>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)

export default {
  name: 'LineChart',
  components: {
    LineChartGenerator,
  },

  // beforeCreate(){
  //   console.log('before create');
  // },
  // created(){
  //   console.log('created');
  // },
  // beforeMount(){
  //   console.log('before mount');
  // },

  async mounted() {
    console.log('mounted');
    this.loaded = false

    try {
      const response = await this.$axios.get('/kasbesar',{
        params: {
        limit: 10,
        cabang_id: JSON.parse(localStorage.getItem('cabang_id')),
      },
      })

      console.log(response.data.result.data);



      // Get all the numbers/labels from the response
      this.chartData.labels =  response.data.result.data.map((data)=>{
      
return data.tanggal
      })
      this.chartData.datasets[0].data =  response.data.result.data
        .map((i) => i.jumlah)

        this.chartData.datasets[1].data =  response.data.result.data
        .map((i) => i.jumlah)
   

      console.log('chart Data ', JSON.stringify(this.chartdata))
      console.log('chart Data numbers: ', this.newChartArray)

      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  },
  computed: {
    myStyles() {
      return {
        position: 'relative',
      }
    },
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
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
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
  },
  data() {
    return {
      lastPage: 1,
      nextUrl: '',
      prevUrl: '',
      keywords: null,
      pagenow: null,
      kasbesar: {},
      from: '',
      to: '',
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Data Statistik',
            backgroundColor: 'transparent',
            borderColor: 'rgba(1, 116, 188, 0.50)',
            pointBackgroundColor: 'rgba(171, 71, 188, 1)',
            data: [],
          },
          {
            label: 'Data Statistik',
            backgroundColor: 'transparent',
            borderColor: 'rgba(1, 116, 188, 0.50)',
            pointBackgroundColor: 'rgba(171, 71, 188, 1)',
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
}
</script>
