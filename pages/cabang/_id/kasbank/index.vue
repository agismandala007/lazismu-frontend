<template>
  <div
    class="lg:pr-[70px] py-[50px] lg:ml-[320px] px-4 lg:pl-0"
    :class="sidebar ? 'xl:ml-[365px]' : 'xl:ml-[65px]'"
  >
    <!-- Top Section -->
    <Modal
      :onClick="deleteKasbank"
      v-show="modal"
      :toogleModal="modal"
      :close="closeModal"
      :wrongaction="hapus"
      >Hapus akun
      <b class="text-red-700"
        ><i>{{ msg }}</i></b
      ></Modal
    >
    <Modal
      :onClick="exportExcel"
      v-show="modalExport"
      :toogleModal="modalExport"
      :close="closeModal"
      :action="upload"
      >Export dalam bentuk Excel ?</Modal
    >
    <section
      class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
    >
      <!-- Responsive class jika berbentuk lebih kecil -->
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
        <div class="text-[32px] font-semibold text-dark">Kas Bank</div>
      </div>
      <div class="text-[16px] flex">
        <img src="/assets/svgs/user-ic.svg" alt="" height="20px" class="mr-2" />
        <p v-if="role === 1" class="">Administrator</p>
        <p v-if="role === 2" class="">Front Office</p>
        <p v-if="role === 3" class="">Back Office</p>
      </div>
    </section>

    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div
          class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row"
        >
          <div>
            <div class="text-xl font-medium text-dark">Statistics</div>
          </div>
        </div>
      </div>

      <p v-if="$fetchState.pending">Pemasukan Loading ...</p>
      <p v-else-if="$fetchState.error">An error occurred :(</p>
      <div v-else class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">Pemasukan</p>
              <div class="text-[32px] font-bold text-dark mt-[6px]">
                Rp. {{ formatPrice(hitung.data.pemasukan) }}
              </div>
            </div>
          </div>
        </div>
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">Pengeluaran</p>
              <div class="text-[32px] font-bold text-dark mt-[6px]">
                Rp. {{ formatPrice(hitung.data.pengeluaran) }}
              </div>
            </div>
          </div>
        </div>
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">Jumlah Saldo</p>
              <div class="text-[32px] font-bold text-dark mt-[6px]">
                Rp. {{ formatPrice(hitung.data.pemasukan - hitung.data.pengeluaran) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Top Section -->

    <section class="pt-[100px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">Data Kasir</div>
            <p class="text-grey">Kas Bank</p>
          </div>
          <div class="flex items-center">
            <div class="relative">
              <input
                name="start"
                type="date"
                v-model="from"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              />
            </div>

            <span class="mx-4 text-gray-500">to</span>
            <div class="relative mr-4">
              <input
                v-model="to"
                name="end"
                type="date"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Select date end"
              />
            </div>

            <a
              download=""
              @click="modalExport = !modalExport"
              class="button cursor-pointer py-2 px-4 bg-green-400 rounded-lg text-white"
            >
              Export to Excel
            </a>
          </div>
        </div>
      </div>

      <div class="md:container md:mx-auto">
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500">
            <caption
              class="p-5 text-lg font-semibold text-left text-gray-900 bg-white"
            >
              <div class="bg-white flex justify-between items-center">
                <div class="flex items-center mt-3">
                  <label for="table-search" class="sr-only">Search</label>
                  <div class="relative">
                    <div
                      class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                    >
                      <svg
                        class="w-5 h-5 text-gray-500"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="table-search"
                      v-model.lazy="keywords"
                      class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Cari Uraian transaksi, no bukti"
                    />
                  </div>
                </div>
                <NuxtLink
                  :to="{
                    name: 'cabang-id-kasbank-create',
                    params: { id: cabang_id },
                  }"
                  class="btn-sm px-4 py-2 rounded-lg bg-orange-400 text-sm text-white"
                >
                  Tambah
                </NuxtLink>
              </div>
            </caption>
            <thead class="text-xs text-white uppercase bg-orange-400">
              <tr>
                <th scope="col" class="py-3 px-6">No</th>
                <th scope="col" class="py-3 px-6">No Bukti Kas</th>
                <th scope="col" class="py-3 px-6">Tanggal</th>
                <th scope="col" class="py-3 px-6">ref</th>
                <th scope="col" class="py-3 px-6">Uraian Transaksi</th>
                <th scope="col" class="py-3 px-6">Nama Akun Debit</th>
                <th scope="col" class="py-3 px-6">Nama Akun Kredit</th>
                <th scope="col" class="py-3 px-6">Jumlah</th>
                <th scope="col" class="py-3 px-6">Nama Kasir</th>
                <th scope="col" class="py-3 px-6">Aksi</th>
                <th scope="col" class="">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <p v-if="$fetchState.pending">Fetching roles...</p>
              <p v-else-if="$fetchState.error">An error occurred :(</p>

              <tr
                class="bg-white border-b"
                v-else
                v-for="(item, index) in kasbank.data.result.data"
                :key="index"
              >
                <th scope="row" class="py-4 px-6 font-medium text-gray-900">
                  {{ kasbank.data.result.current_page * 10 - 10 + index + 1 }}
                </th>
                <td class="py-4 px-6">{{ item.nobuktikas }}</td>
                <td class="py-4 px-6">{{ item.tanggal }}</td>
                <td class="py-4 px-6">{{ item.ref }}</td>
                <td class="py-4 px-6">{{ item.name }}</td>
                <td class="py-4 px-6" v-if="item.coadebit !== null">
                  {{ item.coadebit.name }}
                </td>
                <td v-else></td>
                <td class="py-4 px-6" v-if="item.coakredit !== null">
                  {{ item.coakredit.name }}
                </td>
                <td v-else></td>
                <td class="py-4 px-6">{{ item.jumlah }}</td>
                <td class="py-4 px-6">{{ item.penerima }}</td>
                <td class="py-4 px-10">
                  <button
                    id="dropdownMenuIconButton"
                    data-dropdown-toggle="dropdownDots"
                    class="inline-flex p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none"
                    type="button"
                    @click="toggleDropDown(item.id)"
                  >
                    <svg
                      class="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                      ></path>
                    </svg>
                  </button>
                  <!-- Dropdown menu -->
                  <div
                    v-show="isHidden"
                    refs="drop"
                    id="dropdownDots"
                    class="bg-white rounded divide-y divide-gray-100 shadow absolute"
                    :class="isHidden === item.id ? 'show' : 'hidden'"
                  >
                    <ul
                      class="py-1 text-sm text-gray-700"
                      aria-labelledby="dropdownMenuIconButton"
                    >
                      <li>
                        <Nuxt-Link
                          :to="{
                            name: 'cabang-id-kasbank-edit',
                            params: { id: cabang_id, item: item.id },
                          }"
                          class="block py-2 px-4 hover:bg-gray-100"
                          >Edit
                        </Nuxt-Link>
                      </li>
                      <li>
                        <button
                          href="#"
                          class="block py-2 px-4 hover:bg-gray-100"
                          @click="openModal(item.id, index), (msg = item.name)"
                        >
                          <!-- deleteKasbank(item, index) -->
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr class="p-4"></tr>
            </tbody>
          </table>
        </div>

        <p v-if="$fetchState.pending">Fetching roles...</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
        <nav
          v-else-if="kasbank.data.result.links"
          class="flex justify-between items-center pt-4"
          aria-label="Table navigation"
        >
          <span class="text-sm font-normal text-gray-500"
            >Showing
            <span class="font-semibold text-gray-900">1-10</span>
            of
            <span class="font-semibold text-gray-900">{{
              kasbank.data.result.last_page
            }}</span></span
          >
          <ul class="inline-flex items-center -space-x-px">
            <li>
              <button
                :value="kasbank.data.result.current_page - 1"
                @click="updatePage"
                class="relative block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                :disabled="kasbank.data.result.current_page == 1"
              >
                &lt;
              </button>
            </li>
            <p v-if="$fetchState.pending">Fetching roles...</p>
            <p v-else-if="$fetchState.error">An error occurred :(</p>
            <li
              v-else
              v-for="(ada, index) in kasbank.data.result.links"
              :key="index"
            >
              <button
                v-if="
                  ada.label != '&laquo; Sebelumnya' &&
                  ada.label != 'Berikutnya &raquo;'
                "
                :value="index"
                @click="updatePage"
                class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                {{ ada.label }}
              </button>
            </li>

            <li>
              <button
                :value="nextUrl"
                @click="updatePage"
                class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                :disabled="pagenow == kasbank.data.result.last_page"
              >
                >
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import { mapActions } from 'vuex'

export default {
  components: { Modal },
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      isHidden: false,
      role: JSON.parse(localStorage.getItem('role')),
      cabang_id: JSON.parse(localStorage.getItem('cabang_id')),
      lastPage: 1,
      nextUrl: 2,
      prevUrl: '',
      keywords: null,
      pagenow: null,
      kasbank: {},
      msg: '',
      from: '',
      to: '',

      hapus: 'Konfirmasi',
      upload: 'Konfirmasi',
      modal: false,
      modalExport: false,
      hitung: {},
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.sidebar
    },
  },
  watch: {
    keywords(after, before) {
      this.refetch()
      fetchOnServer: false
    },

    from(after, before) {
      this.refetch()
      fetchOnServer: false
    },
    to(after, before) {
      this.refetch()
      fetchOnServer: false
    },
  },
  async fetch() {
    this.kasbank = await this.$axios.get('/kasbank', {
      params: {
        limit: 10,
        page: this.pagenow,
        search: this.keywords,
        cabang_id: this.cabang_id,
        from: this.from,
        to: this.to,
      },
    })
    this.hitung = await this.$axios.get('/hitung/kasbank', {
      params: {
        cabang_id: this.cabang_id,
      },
    })
  },
  methods: {
    ...mapActions(['toggleSidebar']),

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    updatePage(event) {
      this.pagenow = parseInt(event.target.value)
      this.refetch()
      this.nextUrl = 1 + parseInt(event.target.value)
    },

    async refetch() {
      this.kasbank = await this.$axios.get('/kasbank', {
        params: {
          limit: 10,
          page: this.pagenow,
          search: this.keywords,
          cabang_id: this.cabang_id,
          from: this.from,
          to: this.to,
        },
      })
      this.hitung = await this.$axios.get('/hitung/kasbank', {
        params: {
          cabang_id: this.cabang_id,
        },
      })
    },

    //this for delete
    async deleteKasbank() {
      await this.$axios.delete(`/kasbank/${this.id}`).then(() => {
        //remove item array by index
        // this.coa.data.result.data.splice(this.index, 1)
        this.id = null
        this.index = null
        this.modal = !this.modal
        this.refetch()
      })
    },
    async exportExcel() {
      this.loading = true
      let newWindow = window.open()
      await this.$axios
        .get('/kasbank/export', {
          params: {
            cabang_id: this.cabang_id,
            from: this.from,
            to: this.to,
          },
          responseType: 'blob',
        })
        .then((response) => {
          this.modalExport = false
          this.loading = false
          // newWindow.location = 'blob:http://lazismu-backend.test/api/kasbank/export'

          const href = URL.createObjectURL(response.data)

          //     console.log(href);

          // create "a" HTML element with href to file & click
          const link = document.createElement('a')
          link.href = href
          link.setAttribute('download', 'kasbank.xlsx') //or any other extension
          link.setAttribute('target', '_blank') //or any other extension
          document.body.appendChild(link)
          link.click()

          // clean up "a" element & remove ObjectURL
          document.body.removeChild(link)
          URL.revokeObjectURL(href)
          this.closeModal()
        })

      //   const response = await this.$http
      //     .get('http://lazismu-backend.test/api/kasbank/export')
      //     .then((response) => {
      //       fileDownload(response.data, 'pedoman.xlsx')
      //     })
    },

    //Method for dots three
    toggleDropDown(kode) {
      if (this.isHidden === false) {
        this.isHidden = kode
        this.$emit('change', this.isHidden)
      } else {
        this.isHidden = false
      }
    },
    openModal(id, index) {
      this.id = id
      this.index = index
      this.modal = !this.modal
    },
    closeModal() {
      this.modal = false
      this.modalimport = false
      this.modalExport = false
    },
  },
}
</script>
