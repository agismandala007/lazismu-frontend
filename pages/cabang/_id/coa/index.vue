<template>
  <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
    <!-- Top Section -->
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
        <div class="text-[32px] font-semibold text-dark">Chart of Account</div>
      </div>
      <div class="flex items-center gap-4">
        <form class="shrink md:w-[516px] w-full">
          <input
            type="text"
            name=""
            id=""
            class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full"
            placeholder="Search people, team, project"
          />
        </form>
        <a
          href="#"
          class="flex-none w-[46px] h-[46px] bg-white rounded-full p-[11px] relative notification-dot"
        >
          <img src="/assets/svgs/ic-bell.svg" alt="" />
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

      <p v-if="$fetchState.pending">Data Loading</p>
      <div v-else class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">Coa Debit</p>

              <div class="text-[32px] font-bold text-dark mt-[6px]">
                {{ coadebit.data.result.total }}
              </div>
            </div>
          </div>
        </div>
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">Coa Kredit</p>
              <div class="text-[32px] font-bold text-dark mt-[6px]">
                {{ coakredit.data.result.total }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pt-[50px]">
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
            :to="{ name: 'cabang-id-coa-createdebit', params: { id: cabang_id }}"
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
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >Edit</a
                >
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
              coadebit.data.result.last_page
            }}</span></span
          >
          <ul class="inline-flex items-center -space-x-px">
            <li>
              <button
                :value="coadebit.data.result.current_page - 1"
                @click="updatePage"
                class="relative block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
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

    <section class="pt-[50px]">
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
            :to="{ name: 'coa-createkredit' }"
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
            <p v-if="$fetchState.pending">Fetching roles...</p>
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
                <a
                  href="#"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >Edit</a
                >
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
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      cabang_id : JSON.parse(localStorage.getItem('cabang_id')),
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
      },
    })
  },
  methods: {
    updatePage(event) {
      this.pagenow = parseInt(event.target.value)
      this.$nuxt.refresh()
      this.nextUrl = 1+parseInt(event.target.value)

    },
    updatePage2(event) {
      this.pagenow2 = parseInt(event.target.value)
      this.$nuxt.refresh()
      this.nextUrl2 = 1+parseInt(event.target.value)

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
  },
}
</script>
