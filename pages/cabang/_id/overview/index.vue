<template>
  <div>
    <!-- Main Content -->
    <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">

        <!-- Top Section -->
        <section class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row">
            <div class="flex items-center justify-between gap-4">
                <a href="#" id="toggleOpenSidebar" class="lg:hidden">
                    <svg class="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h7">
                        </path>
                    </svg>
                </a>
                <div class="text-[32px] font-semibold text-dark">
                    Overview
                </div>
            </div>
            <div class="flex items-center gap-4">
                <form class="shrink md:w-[516px] w-full">
                    <input type="text" name="" id="" class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200
                        focus:ring-2 transition-all duration-300 w-full" placeholder="Search people, team, project">
                </form>
                <a href="#"
                    class="flex-none w-[46px] h-[46px] bg-white rounded-full p-[11px] relative notification-dot">
                    <img src="/assets/svgs/ic-bell.svg" alt="">
                </a>
            </div>
        </section>

        <section class="pt-[50px]">
            <!-- Section Header -->
            <div class="mb-[30px]">
                <div class="flex items-center justify-between gap-6">
                    <div>
                        <div class="text-xl font-medium text-dark">
                            Statistics
                        </div>
                        <p class="text-grey">Your business growth</p>
                    </div>
                </div>
            </div>

            <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
                <div class="card !gap-y-10 min-h-[200px]">
                    <div class="text-center items-center">
                        <div class="">
                            <p class="text-grey">My Balance</p>
                            <div class="text-[32px] font-bold text-orange-400 mt-[6px]">
                                Rp. 1000.000
                            </div>
                        </div>
                        
                    </div>
                </div>
            
                <div class="card !gap-y-10 min-h-[200px]">
                    <div class="items-center justify-between">
                        <div>
                            <doughnut :chartData="Ddata" :chartOptions="Doptions" style="height: 226px; width: 100%"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="pt-[50px]">
            <div class="grid md:grid-cols-2 gap-0">
                <!-- Documents -->
                <div>
                    <!-- Section Header -->
                    <div class="mb-[30px]">
                        <div class="items-center justify-between">
                            <div>
                                <div class="text-xl font-medium text-dark">
                                    Chart
                                </div>
                                <p class="text-grey">Standard procedure</p>
                            </div>
                        </div>
                    </div>
                    <div class="card min-h-[468px] items-center">
                      <div class="bg-white md:min-h-[400px] w-[400px] flex">
                          <bar :chartData="chartData" :chartOptions="chartOptions"/>
                      </div>
                    </div>
                  </div>

                <!-- History -->
                <div>
                    <!-- Section Header -->
                    <div class="mb-[30px]">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="text-xl font-medium text-dark">
                                    History
                                </div>
                                <p class="text-grey">Track the flow</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-chart min-h-[468px] items-center">
                        <div class="bg-white flex ">
                          <line-chart-generator />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  </div>
</template>

<script>
import bar from '@/components/chart/bar.vue';
import LineChartGenerator from '@/components/chart/LineChart.vue';
import Doughnut from '@/components/chart/DougnutChart.vue';
export default {
  layout: 'dashboard',
  components: { bar,LineChartGenerator, Doughnut },
   data() {
    return {
    role : localStorage.getItem('role'),
    cabang_id : localStorage.getItem('cabang_id'),
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] } ]
      },
      chartOptions: {
        barPercentage: 0.5,
        responsive: true,
        maintainAspectRatio: false,
        backgroundColor:['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)',],
        barThickness: 12,
      },
      Ddata: {
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
      Doptions: {
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
  mounted(){
    console.log(this.role);
    console.log(this.cabang_id);
  }
}
</script>
