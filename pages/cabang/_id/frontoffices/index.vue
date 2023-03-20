<template>
  <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
    <!-- Top Section -->
    <section
      class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
    >
      <div class="flex items-center justify-between gap-4">
        <a href="#" id="toggleOpenSidebar" class="lg:hidden">
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
        <div class="text-[32px] font-semibold text-dark">Front Offices</div>
      </div>
      <div class="flex items-center">
        <div class="relative">
          <input
            name="start"
            type="date"
            v-model="from"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          />
        </div>

        <span class="mx-4 text-gray-500">to</span>
        <div class="relative mr-4">
          <input
            v-model="to"
            name="end"
            type="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Select date end"
          />
        </div>

        <a
          download=""
          @click="exportExcel()"
          class="button cursor-pointer py-3 px-3 bg-green-400 rounded rounded-lg"
        >
          Export to Excel
        </a>
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

      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">Pemasukan</p>
              <div class="text-[32px] font-bold text-dark mt-[6px]">
                <p v-if="$fetchState.pending">Fetching roles...</p>
                Rp. {{ pemasukan }}
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">Data Belum Terverifikasi</p>
              <div class="text-[32px] font-bold text-dark mt-[6px]">1</div>
            </div>
          </div>
        </div>
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">Verifikasi</p>
              <div class="text-[32px] font-bold text-dark mt-[6px]">12</div>
            </div>
          </div>
        </div> -->
      </div>
    </section>

    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">Data Kasir</div>
            <p class="text-grey">Front Offices</p>
          </div>
        </div>
      </div>

      <div class="md:container md:mx-auto">
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400 whitespace-nowrap"
          >
            <caption
              class="p-5 text-lg font-semibold text-left text-gray-900 bg-white"
            >
              <div class="bg-white flex justify-between items-center">
                <label for="table-search" class="sr-only">Search</label>
                <div class="relative mt-1">
                  <div
                    class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                  >
                    <svg
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                    placeholder="Search for items"
                  />
                </div>
                <NuxtLink
                  :to="{
                    name: 'cabang-id-frontoffices-create',
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
                <th scope="col" class="py-3 px-6">No Bukti Penerima</th>
                <th scope="col" class="py-3 px-6">Uraian Transaksi</th>
                <th scope="col" class="py-3 px-6">Tanggal</th>
                <th scope="col" class="py-3 px-6">Muzakki</th>
                <th scope="col" class="py-3 px-6">Penerima</th>
                <th scope="col" class="py-3 px-6">Akun Debit</th>
                <th scope="col" class="py-3 px-6">Akun Kredit</th>
                <th scope="col" class="py-3 px-6">Tempat Bayar</th>
                <th scope="col" class="py-3 px-6">Jumlah</th>
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
                v-for="(item, index) in frontoffice.data.result.data"
                :key="index"
              >
                <th scope="row" class="py-4 px-6 font-medium text-gray-900">
                  {{
                    frontoffice.data.result.current_page * 10 - 10 + index + 1
                  }}
                </th>
                <td class="py-4 px-6">{{ item.nobuktipenerima }}</td>
                <td class="py-4 px-6">{{ item.name }}</td>
                <td class="py-4 px-6">{{ item.tanggal }}</td>
                <td class="py-4 px-6">{{ item.penyetor }}</td>
                <td class="py-4 px-6">{{ item.penerima }}</td>
                <td class="py-4 px-6" v-if="item.coadebit !== null">
                  {{ item.coadebit.name }}
                </td>
                <td v-else></td>
                <td class="py-4 px-6" v-if="item.coakredit !== null">
                  {{ item.coakredit.name }}
                </td>
                <td v-else></td>
                <td class="py-4 px-6">{{ item.tempatbayar }}</td>
                <td class="py-4 px-6">{{ item.jumlah }}</td>
                <td class="py-4 px-6">
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
                            name: 'cabang-id-frontoffices-edit',
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
                          @click="deleteFrontoffice(item, index)"
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-if="$fetchState.pending">Fetching roles...</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
        <nav
          v-else-if="frontoffice.data.result.links"
          class="flex justify-between items-center pt-4"
          aria-label="Table navigation"
        >
          <span class="text-sm font-normal text-gray-500"
            >Showing
            <span class="font-semibold text-gray-900">1-10</span>
            of
            <span class="font-semibold text-gray-900">{{
              frontoffice.data.result.last_page
            }}</span></span
          >

          <ul class="inline-flex items-center -space-x-px">
            <li>
              <button
                :value="frontoffice.data.result.current_page - 1"
                @click="updatePage"
                class="relative block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                :disabled="frontoffice.data.result.current_page == 1"
              >
                <
              </button>
            </li>
            <p v-if="$fetchState.pending">Fetching roles...</p>
            <p v-else-if="$fetchState.error">An error occurred :(</p>
            <li
              v-else
              v-for="(ada, index) in frontoffice.data.result.links"
              :key="index"
            >
              <button
                v-if="
                  ada.label != '&laquo; Previous' && ada.label != 'Next &raquo;'
                "
                :value="index"
                @click="updatePage"
                class="py-2 px-3 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                {{ ada.label }}
              </button>
            </li>

            <li>
              <button
                :value="nextUrl"
                @click="updatePage"
                class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                :disabled="pagenow == frontoffice.data.result.last_page"
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
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      nextUrl: 2,
      jumlahtot: [],
      pemasukan: null,
      prevUrl: null,
      keywords: null,
      now: null,
      pagenow: 1,
      frontoffice: {},
      isHidden: false,
      cabang_id: JSON.parse(localStorage.getItem('cabang_id')),
      from: '',
      to: '',
    }
  },
  watch: {
    keywords(after, before) {
      this.fetch1()
      fetchOnServer: false
    },
    to(after, before) {
      this.fetch1()
      fetchOnServer: false
    },
  },

  async fetch() {
    await this.$axios
      .get('/frontoffice', {
        params: {
          limit: 10,
          page: this.pagenow,
          search: this.keywords,
          cabang_id: this.cabang_id,
        },
      })
      .then((response) => {
        this.frontoffice = response
        this.now = this.frontoffice.data.result.current_page
      })
  },
  methods: {
    updatePage(event) {
      this.pagenow = parseInt(event.target.value)
      this.nextUrl = 1 + parseInt(event.target.value)
      this.$nuxt.refresh()
    },
    fetch1() {
      this.$nuxt.refresh()
    },
    //this for delete
    async deleteFrontoffice(item, index) {
      //delete data post by ID
      await this.$axios.delete(`/frontoffice/${item.id}`).then(() => {
        //remove item array by index
        this.frontoffice.data.result.data.splice(index, 1)
      })
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
  },

  //Method untuk export frontoffice
  async exportExcel() {
    this.loading = true
    let newWindow = window.open()
    await this.$axios
      .get('/frontoffice/export', {
        responseType: 'blob',
      })
      .then((response) => {
        this.loading = false
        // newWindow.location = 'blob:http://lazismu-backend.test/api/kasbesar/export'

        const href = URL.createObjectURL(response.data)

        //     console.log(href);

        // create "a" HTML element with href to file & click
        const link = document.createElement('a')
        link.href = href
        link.setAttribute('download', 'frontoffice.xlsx') //or any other extension
        link.setAttribute('target', '_blank') //or any other extension
        document.body.appendChild(link)
        link.click()

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link)
        URL.revokeObjectURL(href)
      })

    //   const response = await this.$http
    //     .get('http://lazismu-backend.test/api/kasbesar/export')
    //     .then((response) => {
    //       fileDownload(response.data, 'pedoman.xlsx')
    //     })
  },
}
</script>
