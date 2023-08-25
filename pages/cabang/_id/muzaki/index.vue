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
          <div class="text-[32px] font-semibold text-dark">Muzakki Manajemen</div>
        </div>
        <div class="text-[16px] flex">
          <img src="/assets/svgs/user-ic.svg" alt="" height="20px" class="mr-2" />
          <p v-if="role === 1" class="">Administrator</p>
          <p v-if="role === 2" class="">Front Office</p>
          <p v-if="role === 3" class="">Back Office</p>
        </div>
      </section>
  
      <section class="pt-[50px]"></section>
  
      <section class="pt-[50px]">
        <!-- Section Header -->
        <div class="mb-[30px]">
          <div class="flex items-center justify-between gap-6">
            <div>
              <div class="text-xl font-medium text-dark">Muzakki</div>
              <p class="text-grey">Pengaturan Muzakki</p>
            </div>
          </div>
        </div>
  
        <div
          class="overflow-x-auto relative shadow-md sm:rounded-lg p-2 bg-white"
        >
          <div class="pb-4 bg-white flex justify-between items-center">
            <label for="table-search" class="sr-only">Search</label>
  
            <div class="flex">
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
                  placeholder="Cari Nama"
                  v-model="keywords"
                />
              </div>
              <!-- <div class="mt-1 ml-2">
                <select
                  name="role"
                  id=""
                  class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5"
                  v-model="roleFilter"
                >
                  <option value="0" selected>Pilih Role :</option>
                  <option value="1">Admin</option>
                  <option value="2">Front Office</option>
                  <option value="3">Back Office</option>
                </select>
              </div> -->
            </div>
            <NuxtLink
              :to="{
                name: 'cabang-id-muzaki-create',
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
                <th scope="col" class="py-3 px-6">Nama</th>
                <th scope="col" class="py-3 px-6">Alamat</th>
                <th scope="col" class="py-3 px-6">Nomor Telpon</th>
                <th scope="col" class="py-3 px-6">NPWP</th>
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
                v-for="(item, index) in user.data.result.data"
                :key="index"
              >
                <td class="p-4 w-4">
                  <div class="flex items-center">
                    {{ user.data.result.current_page * 10 - 10 + index + 1 }}
                  </div>
                </td>
                <td scope="row" class="py-4 px-6 font-medium text-gray-900">
                  {{ item.nama }}
                </td>
                <td class="py-4 px-6">{{ item.alamat }}</td>
                <td class="py-4 px-6">{{ item.noTelp }}</td>
                <td class="py-4 px-6">{{ item.npwp }}</td>
                <!-- <td class="py-4 px-6">
                  {{ rolename[item.role - 1] }}
                </td> -->
  
                <!-- <td class="py-4 px-6">
                  <p v-if="item.cabang">{{ item.cabang.noTelp }}</p>
                  <p v-else class="text-red-500">terhapus</p>
                </td> -->
  
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
                            name: 'cabang-id-user-edit',
                            params: { item: item.id },
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
                user.data.result.last_page
              }}</span></span
            >
            <ul class="inline-flex items-center -space-x-px">
              <li>
                <button
                  :value="user.data.result.current_page - 1"
                  @click="updatePage"
                  class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  :disabled="user.data.result.current_page == 1"
                >
                  &lt;
                </button>
              </li>
              <p v-if="$fetchState.pending">Fetching roles...</p>
  
              <li
                v-else
                v-for="(ada, index) in user.data.result.links"
                :key="index"
              >
                <button
                  v-if="
                    ada.label != '&laquo; Sebelumnya' &&
                    ada.label != 'Berikutnya &raquo;'
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
                  :disabled="pagenow == user.data.result.last_page"
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
  import { mapActions } from 'vuex'
  export default {
    layout: 'dashboard',
    middleware: 'auth',
    directives: {
      clickOutside: vClickOutside.directive,
    },
    data() {
      return {
        cabang_id: JSON.parse(localStorage.getItem('cabang_id')),
        role: JSON.parse(localStorage.getItem('role')),
        nextUrl: 2,
        prevUrl: null,
        keywords: null,
        pagenow: null,
        isHidden: false,
        rolename: ['Admin', 'front Office', 'Back Office'],
        roleFilter: '0',
        user: {},
        hapus: 'Konfirmasi',
        modal: false,
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
      roleFilter() {
        console.log(this.roleFilter)
        this.$nuxt.refresh()
        this.pagenow = 1
        this.nextUrl = 2
        this.prevUrl = null
      },
    },
    mounted() {
      console.log(this.isHidden)
    },
    async fetch() {
      this.user = await this.$axios.get('/muzaki', {
        params: {
          search: this.keywords,
          limit: 10,
          page: this.pagenow,
          role: this.roleFilter,
        },
      })
    },
    methods: {
      ...mapActions(['toggleSidebar']),
  
      updatePage(event) {
        this.pagenow = parseInt(event.target.value)
        this.$nuxt.refresh()
        this.nextUrl = 1 + parseInt(event.target.value)
      },
      async refetch() {
        this.user = await this.$axios.get('/muzaki', {
          params: {
            limit: 10,
            page: this.pagenow,
            search: this.keywords,
            role: this.roleFilter,
          },
        })
      },

      async fetch() {
      try{
        const {data} = await this.$axios.get('/muzaki', this.data)
        // let getNama = nama.data.result
        // console.log(nama.data.result.data)
        this.data  = data.result.data
        console.log(this.data)
      } catch (error) {
        this.errors = error.nama.data.errors
        this.listerror = true
      }
    },
  
      async deletePost(item, index) {
        //delete data post by ID
        await this.$axios.delete(`/user/${item.id}`).then(() => {
          //remove item array by index
          this.user.data.result.data.splice(index, 1)
        })
      },
  
      //Method for dots three
      toggleDropDown(id) {
        if (this.isHidden === false) {
          this.isHidden = id
          this.$emit('change', this.isHidden)
        } else {
          this.isHidden = false
        }
      },
      async deletePost() {
        //delete data post by ID
        await this.$axios.delete(`/coa/${this.id}`).then(() => {
          //remove item array by index
          // this.coa.data.result.data.splice(this.index, 1)
          this.id = null
          this.index = null
          this.modal = !this.modal
          this.refetch()
        })
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
  