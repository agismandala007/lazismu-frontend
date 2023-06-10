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
    console.log('mounted')
    this.loaded = false
    this.fetch()
  },
  computed: {
    sumData() {},
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
      default: 1100,
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
    menu: {
      type: String,
      default: 'frontoffice',
    },
  },
  data() {
    return {
      menu: this.menu,
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
            label: 'Data Masuk',
            backgroundColor: 'transparent',
            borderColor: 'rgba(1, 116, 188, 0.1)',
            pointBackgroundColor: 'rgba(1, 116, 188, 0.50)',
            data: [],
          },
          {
            label: 'Data Keluar',
            backgroundColor: 'transparent',
            borderColor: 'rgba(251, 29, 52, 0.1)',
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
  watch: {
    menu(after, before) {
      this.fetch()
    },
  },
  methods: {
    async fetch() {
      try {
        const response = await this.$axios.get('/hitung/statistik', {
          params: {
            menu: this.menu,
            cabang_id: JSON.parse(localStorage.getItem('cabang_id')),
          },
        })
        var sumData = {}

        response.data.kasbesarIn.forEach(function (item) {
          var tanggal = item.tanggal
          var jumlah = item.jumlah
          if (sumData[tanggal]) {
            sumData[tanggal] += jumlah
          } else {
            sumData[tanggal] = jumlah
          }
        })
        this.summedData = Object.keys(sumData).map(function (tanggal) {
          return { tanggal: tanggal, jumlah: sumData[tanggal] }
        })

        var sumkOut = {}
        response.data.kasbesarOut.forEach(function (item) {
          var tanggal = item.tanggal
          var jumlah = item.jumlah
          if (sumkOut[tanggal]) {
            sumkOut[tanggal] += jumlah
          } else {
            sumkOut[tanggal] = jumlah
          }
        })
        this.kasbesarOut = Object.keys(sumkOut).map(function (tanggal) {
          return { tanggal: tanggal, jumlah: sumkOut[tanggal] }
        })

        // Get all the numbers/labels from the response
        this.label1 = this.summedData.map((data) => {
          return data.tanggal
        })
        // Get all the numbers/labels from the response
        this.label2 = this.kasbesarOut.map((data) => {
          return data.tanggal
        })

        function arrayUnique(array) {
          var a = array.concat()
          for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
              if (a[i] === a[j]) a.splice(j--, 1)
            }
          }

          return a
        }

        this.label3 = arrayUnique(this.label1.concat(this.label2))
        console.log(this.label3)

        this.chartData.labels = this.label3.sort()

        this.datamasuk = this.getData(this.summedData, this.label1)
        console.log(this.datamasuk)
        this.chartData.datasets[0].data = this.datamasuk.map((i) => {
          return i
        })

        this.datakeluar = this.getData(this.kasbesarOut, this.label2)
        this.chartData.datasets[1].data = this.datakeluar.map((g) => {
          return g
        })

        this.loaded = true
      } catch (e) {
        console.error(e)
      }
    },
    getData(datasets, labels) {
      const data = []

      labels.forEach((label) => {
        const d = datasets.find((item) => item.tanggal === label)
        data.push(d && d.jumlah !== undefined ? d.jumlah : 0)
      })
      // console.log(data)
      return data
    },
  },
}
</script>
