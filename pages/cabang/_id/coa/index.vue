<template>
  <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
    <!-- Top Section -->
    <Modal
      :onClick="consoleClick"
      v-show="modal"
      :toogleModal="modal"
      :close="closeModal"
      >Hapus akun ?</Modal
    >
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
        <div class="text-[32px] font-semibold text-dark">
          Kode Akun Akutansi
        </div>
      </div>
      <div class="flex items-center gap-4"></div>
    </section>

    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div
          class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row"
        >
          <div>
            <div class="text-xl font-medium text-dark">Jumlah Akun</div>
          </div>
        </div>
      </div>

      <p v-if="$fetchState.pending">Tunggu Sebentar ...</p>
      <div v-else class="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:gap-11">
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">CoA Debit</p>

              <div class="text-[32px] font-bold text-dark mt-[6px]">
                {{ coadebit.data.result.total }} Akun
              </div>
            </div>
            <div>
              <p class="text-grey">CoA Kredit</p>
              <div class="text-[32px] font-bold text-dark mt-[6px]">
                {{ coakredit.data.result.total }} Akun
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pt-[50px] mt-10">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">Coa Debit</div>
            <p class="text-grey">Debit</p>
          </div>
        </div>
      </div>

      <div
        class="overflow-x-auto relative shadow-md sm:rounded-lg p-2 bg-white"
      >
        <div class="pb-4 bg-white flex justify-between items-center">
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
              class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for items"
              v-model="keywords"
            />
          </div>
          <NuxtLink
            :to="{
              name: 'cabang-id-coa-createdebit',
              params: { id: cabang_id },
            }"
            class="btn-sm px-4 py-2 rounded-lg bg-orange-400 text-sm text-white"
          >
            Tambah
          </NuxtLink>
        </div>

        <table
          class="w-full text-sm text-left text-gray-200 hover:border-collapse"
        >
          <thead class="text-xs text-white uppercase bg-orange-400">
            <tr>
              <th scope="col" class="p-2">
                <div class="flex items-center">No.</div>
              </th>
              <th scope="col" class="py-3 px-6">Nama Akun</th>
              <th scope="col" class="py-3 px-6">Kode</th>
              <th scope="col" class="py-3 px-6">Laporan</th>
              <th scope="col" class="py-3 px-6">
                <div class="flex items-center">Aksi</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <p v-if="$fetchState.pending">Fetching roles...</p>
            <tr
              class="bg-white border-b text-gray-700"
              v-else
              v-for="(item, index) in coadebit.data.result.data"
              :key="index"
            >
              <td class="p-4 w-4">
                <div class="flex items-center">
                  {{ coadebit.data.result.current_page * 10 - 10 + index + 1 }}
                </div>
              </td>
              <td scope="row" class="py-4 px-6 font-medium text-gray-900">
                {{ item.name }}
              </td>
              <td class="py-4 px-6">{{ item.kode }}</td>
              <td class="py-4 px-6">{{ item.laporan }}</td>
              <td class="py-4 px-6">
                <button
                  id="dropdownMenuIconButton"
                  data-dropdown-toggle="dropdownDots"
                  class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none"
                  type="button"
                  @click="toggleDropDown(item.kode)"
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
                  :class="isHidden === item.kode ? 'show' : 'hidden'"
                >
                  <ul
                    class="py-1 text-sm text-gray-700"
                    aria-labelledby="dropdownMenuIconButton"
                  >
                    <li>
                      <Nuxt-Link
                        :to="{
                          name: 'cabang-id-coa-editdebit',
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
                        @click="deletePost(item, index)"
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
                <!-- <div class="flex items-center">
                  <NuxtLink :to="{name: '', params: { id: cabang_id }}"  class="bg-gray-100"
                  tag="img"
                  :src="require('~/static/assets/svgs/dot3.svg')" >
                      
                  </Nuxtlink>
                </div> -->
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="$fetchState.pending">Fetching</p>
        <nav
          v-else
          class="flex justify-between items-center pt-4"
          aria-label="Table navigation"
        >
          <span class="text-sm font-normal text-gray-500"
            >Showing
            <span class="font-semibold text-gray-900">1-10</span>
            of
            <span class="font-semibold text-gray-900">{{
              coadebit.data.result.last_page
            }}</span></span
          >
          <ul class="inline-flex items-center -space-x-px">
            <li>
              <button
                :value="coadebit.data.result.current_page - 1"
                @click="updatePage"
                class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                :disabled="coadebit.data.result.current_page == 1"
              >
                <
              </button>
            </li>
            <p v-if="$fetchState.pending">Fetching roles...</p>

            <li
              v-else
              v-for="(ada, index) in coadebit.data.result.links"
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
                :disabled="pagenow == coadebit.data.result.last_page"
              >
                >
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    <section id="top" class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">Coa Kredit</div>
            <p class="text-grey">Kredit</p>
          </div>
        </div>
      </div>

      <div
        class="overflow-x-auto relative shadow-md sm:rounded-lg p-2 bg-white"
      >
        <div class="pb-4 bg-white flex justify-between items-center">
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
              class="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for items"
              v-model="keywords2"
            />
          </div>
          <NuxtLink
            :to="{
              name: 'cabang-id-coa-createdebit',
              params: { id: cabang_id },
            }"
            class="btn-sm px-4 py-2 rounded-lg bg-orange-400 text-sm text-white"
          >
            Tambah
          </NuxtLink>
        </div>
        <table
          class="w-full text-sm text-left text-gray-200 hover:border-collapse"
        >
          <thead class="text-xs text-white uppercase bg-orange-400">
            <tr>
              <th scope="col" class="p-2">
                <div class="flex items-center">No.</div>
              </th>
              <th scope="col" class="py-3 px-6">Nama Akun</th>
              <th scope="col" class="py-3 px-6">Kode</th>
              <th scope="col" class="py-3 px-6">Laporan</th>
              <th scope="col" class="py-3 px-6">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <p v-if="$fetchState.pending">Fetching Coakredit...</p>
            <tr
              v-else
              class="bg-white border-b text-gray-700"
              v-for="(items, index) in coakredit.data.result.data"
              :key="index"
            >
              <td class="p-4 w-4">
                <div class="flex items-center">
                  {{ coakredit.data.result.current_page * 10 - 10 + index + 1 }}
                </div>
              </td>
              <td scope="row" class="py-4 px-6 font-medium text-gray-900">
                {{ items.name }}
              </td>
              <td class="py-4 px-6">{{ items.kode }}</td>
              <td class="py-4 px-6">{{ items.laporan }}</td>
              <td class="py-4 px-6">
                <!-- three dots dropdown -->
                <button
                  id="dropdownMenuIconButton"
                  data-dropdown-toggle="dropdownDots"
                  class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none"
                  type="button"
                  @click="toggleDropDown(items.kode)"
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
                  :class="isHidden === items.kode ? 'show' : 'hidden'"
                >
                  <ul
                    class="py-1 text-sm text-gray-700"
                    aria-labelledby="dropdownMenuIconButton"
                  >
                    <li>
                      <Nuxt-Link
                        :to="{
                          name: 'cabang-id-coa-editkredit',
                          params: { id: cabang_id, item: items.id },
                        }"
                        class="block py-2 px-4 hover:bg-gray-100"
                        >Edit
                      </Nuxt-Link>
                    </li>
                    <li>
                      <button
                        href="#"
                        class="block py-2 px-4 hover:bg-gray-100"
                        @click="modal = !modal"
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
        <p v-if="$fetchState.pending">Fetching roles...</p>
        <nav
          v-else
          class="flex justify-between items-center pt-4"
          aria-label="Table navigation"
        >
          <span class="text-sm font-normal text-gray-500"
            >Showing
            <span class="font-semibold text-gray-900">1-10</span>
            of
            <span class="font-semibold text-gray-900">{{
              coakredit.data.result.last_page
            }}</span></span
          >
          <ul class="inline-flex items-center -space-x-px">
            <li>
              <button
                :value="coakredit.data.result.current_page - 1"
                @click="updatePage2"
                class="relative block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                :disabled="coakredit.data.result.current_page == 1"
              >
                <
              </button>
            </li>
            <p v-if="$fetchState.pending">Fetching roles...</p>
            <li
              v-else
              v-for="(ada2, index) in coakredit.data.result.links"
              :key="index"
            >
              <button
                v-if="
                  ada2.label != '&laquo; Previous' &&
                  ada2.label != 'Next &raquo;'
                "
                :value="index"
                @click="updatePage2"
                class="py-2 px-3 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                {{ ada2.label }}
              </button>
            </li>

            <li>
              <button
                :value="nextUrl2"
                @click="updatePage2"
                class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                :disabled="pagenow2 == coakredit.data.result.last_page"
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
import vClickOutside from 'v-click-outside'
import Modal from '@/components/Modal.vue'
export default {
  layout: 'dashboard',
  middleware: 'auth',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      cabang_id: JSON.parse(localStorage.getItem('cabang_id')),
      modal: false,
      nextUrl: 2,
      prevUrl: null,
      nextUrl2: 2,
      prevUrl2: null,
      keywords: null,
      keywords2: null,
      pagenow: null,
      pagenow2: null,
      coadebit: [],
      coakredit: [],
      kode: null,
      isHidden: false,
      config: {
        handler: this.out,
        middleware: this.middleware,
        events: ['dblclick', 'click'],
      },
    }
  },

  watch: {
    keywords(after, before) {
      this.fetch1()
      fetchOnServer: false
    },
    keywords2(after, before) {
      this.fetch2()
      fetchOnServer: false
    },
    pagenow2(after, before) {
      this.$nextTick(function () {
        // DOM updated
        let elmnt = document.getElementById('top')
        elmnt.scrollIntoView(false)
        console.log('terscroll')
      })
    },
  },
  components: { Modal },
  mounted() {
    window.scrollTo(
      0,
      document.body.scrollHeight || document.documentElement.scrollHeight
    )
    console.log(this.isHidden)
  },
  async fetch() {
    this.coadebit = await this.$axios.get('/coadebit', {
      params: {
        name: this.keywords,
        limit: 10,
        page: this.pagenow,
        cabang_id: this.cabang_id,
      },
    })
    this.coakredit = await this.$axios.get('/coakredit', {
      params: {
        name: this.keywords2,
        limit: 10,
        page: this.pagenow2,
        cabang_id: this.cabang_id,
      },
    })
  },
  methods: {
    updatePage(event) {
      this.pagenow = parseInt(event.target.value)
      this.$nuxt.refresh()
      this.nextUrl = 1 + parseInt(event.target.value)
    },
    updatePage2(event) {
      this.pagenow2 = parseInt(event.target.value)
      this.nextUrl2 = 1 + parseInt(event.target.value)
      this.$nuxt.refresh()
    },
    fetch1() {
      this.$axios
        .get('/coadebit', {
          params: {
            limit: 10,
            page: this.pagenow,
            name: this.keywords,
          },
        })
        .then((response) => (this.coadebit = response.result.data))
        .catch((error) => {})
      this.$nuxt.refresh()
    },
    fetch2() {
      this.$axios
        .get('/coakredit', {
          params: {
            limit: 10,
            page: this.pagenow2,
            name: this.keywords2,
          },
        })
        .then((response) => (this.coakredit = response.result.data))
        .catch((error) => {})
      this.$nuxt.refresh()
    },

    async deletePost(item, index) {
      //delete data post by ID
      await this.$axios.delete(`/coadebit/${item.id}`).then(() => {
        //remove item array by index
        this.coadebit.data.result.data.splice(index, 1)
      })
    },
    async deleteKredit(item, index) {
      //delete data post by ID
      await this.$axios.delete(`/coakredit/${item.id}`).then(() => {
        //remove item array by index
        this.coakredit.data.result.data.splice(index, 1)
      })
    },

    consoleClick() {
      console.log('ter klik konsole modal')
      this.modal = false
    },
    closeModal() {
      this.modal = false
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
}
</script>
