<template>
  <div>
    <!-- Main Content -->
    <div
      class="lg:pr-[70px] py-[50px] lg:ml-[320px] px-4 lg:pl-0"
      :class="sidebar ? 'xl:ml-[365px]' : 'xl:ml-[65px]'"
    >
      <!-- Top Section -->
      <section
        class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
      >
        <div class="flex items-center justify-between gap-4">
          <a href="#" id="toggleOpenSidebar" @click="toggleSidebar">
            <svg
              class="w-6 h-6 text-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              ></path>
            </svg>
          </a>
          <div class="text-[32px] font-semibold text-dark">Beranda</div>
        </div>
        <div class="text-[16px] flex">
          <img
            src="/assets/svgs/user-ic.svg"
            alt=""
            height="20px"
            class="mr-2"
          />
          <p v-if="role === 1" class="">Administrator</p>
          <p v-if="role === 2" class="">Front Office</p>
          <p v-if="role === 3" class="">Back Office</p>
        </div>
      </section>
      <section class="flex my-8 justify-start gap-2">
        <div
          :v-if="role === 1 || role === 3"
          v-for="(menu, id) in menus"
          :key="id"
        >
          <button
            class="text-white px-4 py-2 mr-0 rounded-lg"
            :class="[
              isActive == menu.statistik
                ? ['border-2 border-blue-500', menu.color]
                : menu.color,
            ]"
            @click.prevent="
              changeMenu(menu.statistik), changeActive(menu.statistik)
            "
          >
            {{ menu.item }}
          </button>
        </div>

        <div v-if="role === 2">
          <button
            class="text-white px-4 py-2 mr-0 rounded-lg bg-red-500 active:border-cyan-500"
            @click.prevent="changeMenu('frontoffice')"
          >
            Front Office
          </button>
        </div>
      </section>

      <section>
        <!-- Section Header -->
        <div class="mb-[30px]">
          <div class="flex items-center">
            <div>
              <div class="text-xl font-medium text-dark">Statistik</div>
              <p class="text-grey">
                Perkembangan Pemasukan dan Pengeluaran dalam satu bulan
              </p>
            </div>
          </div>
        </div>
        <div class="card-chart min-h-[468px] items-center">
          <div class="bg-white flex">
            <line-chart-generator v-if="menu" :menu="menu" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import bar from '@/components/chart/bar.vue'
import LineChartGenerator from '@/components/chart/LineChart.vue'
import Doughnut from '@/components/chart/DougnutChart.vue'
import role from '~/middleware/role'
export default {
  layout: 'dashboard',
  components: { bar, LineChartGenerator, Doughnut },
  data() {
    return {
      role: JSON.parse(localStorage.getItem('role')),
      menu: 'frontoffice',
      isActive: 'frontoffice',
      menus: [
        {
          color: 'bg-red-700',
          item: 'Kas Besar',
          statistik: 'kasbesar',
        },
        {
          color: 'bg-green-700',
          item: 'Front Office',
          statistik: 'frontoffice',
        },
        {
          color: 'bg-blue-700',
          item: 'Kas Kecil',
          statistik: 'kaskecil',
        },
        {
          color: 'bg-yellow-700',
          item: 'Kas Bank',
          statistik: 'kasbank',
        },
        {
          color: 'bg-gray-700',
          item: 'Jurnal Umum',
          statistik: 'jurnalumum',
        },
      ],
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.sidebar
    },
  },

  methods: {
    ...mapActions(['toggleSidebar']),
    changeMenu(menu) {
      this.menu = menu
    },
    changeActive(menu) {
      this.isActive = menu
    },
  },
}
</script>
