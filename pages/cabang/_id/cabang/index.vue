<template>
  <div
    class="lg:pr-[70px] py-[50px] lg:ml-[320px] px-4 lg:pl-0"
    :class="sidebar ? 'xl:ml-[365px]' : 'xl:ml-[65px]'"
  >
    <!-- Top Section -->
    <Modal
      :onClick="deletePost"
      v-show="modal"
      :toogleModal="modal"
      :close="closeModal"
      :wrongaction="hapus"
      >Hapus akun
      <b class="text-red-700"
        ><i>{{ msg }}</i></b
      ></Modal
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
        <div class="text-[32px] font-semibold text-dark">Cabang</div>
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
            <div class="text-xl font-medium text-dark">Statistik</div>
          </div>
        </div>
      </div>

      <p v-if="$fetchState.pending">Data Loading</p>
      <div v-else class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
        <div class="card !gap-y-10">
          <div class="flex items-center">
            <div>
              <p class="text-grey">Jumlah Cabang</p>

              <div class="text-[32px] font-bold text-dark mt-[6px]">
                {{ cabang.data.result.total }}
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
            <div class="text-xl font-medium text-dark">Cabang</div>
            <p class="text-grey">Daftar Cabang</p>
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
              placeholder="Cari nama cabang"
              v-model="keywords"
            />
          </div>
          <NuxtLink
            :to="{
              name: 'cabang-id-cabang-create',
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
              <th scope="col" class="py-3 px-10">Nama Cabang</th>
              <th scope="col" class="py-3 px-6">Id</th>
              <th scope="col" class="py-3 px-6">
                <div class="">Aksi</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <p v-if="$fetchState.pending">Fetching roles...</p>
            <tr
              class="bg-white border-b text-gray-700"
              v-else
              v-for="(item, index) in cabang.data.result.data"
              :key="index"
            >
              <td class="p-4 w-4">
                <div class="flex items-center">
                  {{ cabang.data.result.current_page * 10 - 10 + index + 1 }}
                </div>
              </td>
              <td scope="row" class="py-4 px-6 font-medium text-gray-900">
                {{ item.name }}
              </td>
              <td class="py-4 px-6">{{ item.id }}</td>
              <td class="py-4 px-6">
                <button
                  id="dropdownMenuIconButton"
                  data-dropdown-toggle="dropdownDots"
                  class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none"
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
                  id="dropdownDots"
                  class="bg-white w-fit rounded divide-y divide-gray-100 shadow"
                  :class="isHidden === item.id ? 'show' : 'hidden'"
                >
                  <ul
                    class="py-1 text-sm text-gray-700"
                    aria-labelledby="dropdownMenuIconButton"
                  >
                    <li>
                      <Nuxt-Link
                        :to="{
                          name: 'cabang-id-cabang-edit',
                          params: { item: item.id },
                        }"
                        class="block py-2 px-2 w-10 hover:bg-gray-100"
                      >
                        Edit
                      </Nuxt-Link>
                    </li>
                    <li>
                      <button
                        href="#"
                        class="block py-2 px-2 hover:bg-gray-100"
                        @click="openModal(item.id, index), (msg = item.name)"
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
              cabang.data.result.last_page
            }}</span></span
          >
          <ul class="inline-flex items-center -space-x-px">
            <li>
              <button
                :value="cabang.data.result.current_page - 1"
                @click="updatePage"
                class="relative block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                :disabled="cabang.data.result.current_page == 1"
              >
                &lt;
              </button>
            </li>
            <p v-if="$fetchState.pending">Fetching roles...</p>

            <li
              v-else
              v-for="(ada, index) in cabang.data.result.links"
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
                :disabled="pagenow == cabang.data.result.last_page"
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
      cabang_id: JSON.parse(localStorage.getItem('cabang_id')),
      role: JSON.parse(localStorage.getItem('role')),
      nextUrl: null,
      prevUrl: null,
      keywords: null,
      pagenow: null,
      cabang: [],
      modal: false,
      hapus: 'Konfirmasi',
      isHidden: false,
      msg: '',
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
  },
  async fetch() {
    this.cabang = await this.$axios.get('/cabang', {
      params: {
        name: this.keywords,
        limit: 10,
      },
    })
  },

  methods: {
    ...mapActions(['toggleSidebar']),
    toggleDropDown(kode) {
      console.log('pencet log', this.isHidden)
      if (this.isHidden === false) {
        this.isHidden = kode
      } else {
        this.isHidden = false
      }
    },
    closeDropDown() {
      this.isHidden = false
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

    async refetch() {
      this.cabang = await this.$axios.get('/cabang', {
        params: {
          name: this.keywords,
          limit: 10,
          page: this.pagenow,
        },
      })
      // (this.jumlahCoa = await this.$axios.get('/hitung/coa', {
      //   params: {
      //     cabang_id: this.cabang_id,
      //   },
      // }))
    },
    async deletePost() {
      //delete data post by ID
      await this.$axios.delete(`/cabang/${this.id}`).then(() => {
        this.id = null
        this.index = null
        this.modal = !this.modal
        this.refetch()
      })
    },

    updatePage(event) {
      this.pagenow = parseInt(event.target.value)
      this.$nuxt.refresh()
      this.nextUrl = 1 + parseInt(event.target.value)
    },
  },
}
</script>
