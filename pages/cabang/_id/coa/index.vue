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
        ><i>{{ msg }}</i>
      </b>
      ?</Modal
    >
    <Modal
      :onClick="exportExcel"
      v-show="modalExport"
      :toogleModal="modalExport"
      :close="closeModal"
      :action="upload"
      >Export dalam bentuk Excel ?</Modal
    >
    <Modal
      :onClick="closeModal"
      v-show="modalimport"
      :toogleModal="modalimport"
      :close="closeModal"
      :action="upload"
    >
      <input type="file" @change="onFilePicked" name="file" />
      <p class="text-red-500 mb-4">{{ messageimport }}</p>
    </Modal>
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
        <div class="text-[32px] font-semibold text-dark">
          Kode Akun Akutansi
        </div>
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
            <div class="text-xl font-medium text-dark">Jumlah Akun</div>
          </div>
        </div>
      </div>

      <p v-if="$fetchState.pending">Tunggu Sebentar ...</p>
      <div v-else class="gap-6 sm:grid-cols-2 md:grid-cols-2 lg:gap-11">
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">CoA Debit</p>

              <div class="text-[32px] font-bold text-dark mt-[6px]">
                {{ jumlahCoa.data.coadebit }} Akun
              </div>
            </div>
            <div>
              <p class="text-grey">CoA Kredit</p>
              <div class="text-[32px] font-bold text-dark mt-[6px]">
                {{ jumlahCoa.data.coakredit }} Akun
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
            <div class="text-xl font-medium text-dark">
              Kode Akun (chart of account)
            </div>
            <p class="text-grey">Debit Kredit</p>
          </div>
          <div class="flex items-end">
            <a
              download=""
              @click="modalimport = !modalimport"
              class="button cursor-pointer py-2 px-4 bg-blue-400 rounded-lg text-white"
            >
              Import
            </a>
            <a
              download=""
              @click="modalExport = !modalExport"
              class="button cursor-pointer ml-1 py-2 px-4 bg-green-400 rounded-lg text-white"
            >
              Export to Excel
            </a>
          </div>
        </div>
      </div>

      <div class="md:container md:mx-auto">
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg bg-white">
          <table
            class="w-full text-sm text-left text-gray-200 hover:border-collapse whitespace-nowrap"
          >
            <caption
              class="p-5 text-lg font-semibold text-left text-gray-900 bg-white"
            >
              <div class="bg-white flex justify-between items-center">
                <div class="flex">
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
                      placeholder="Cari nama akun"
                      v-model="keywords"
                    />
                  </div>
                  <div class="mt-1 ml-2">
                    <select
                      name="tipe"
                      id=""
                      class="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-2.5"
                      v-model="isKredit"
                    >
                      <option value="false" selected>Debit</option>
                      <option value="1">Kredit</option>
                    </select>
                  </div>
                </div>

                <NuxtLink
                  :to="{
                    name: 'cabang-id-coa-create',
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
                <th scope="col" class="p-2">
                  <div class="flex items-center">No.</div>
                </th>
                <th scope="col" class="py-3 px-6">Nama Akun</th>
                <th scope="col" class="py-3 px-6">Kode</th>
                <th scope="col" class="py-3 px-6">Laporan</th>
                <th scope="col" class="py-3 px-6">Tipe</th>
                <th scope="col" class="py-3 px-6">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <p v-if="$fetchState.pending">Fetching roles...</p>
              <tr
                class="bg-white border-b text-gray-700"
                v-else
                v-for="(item, index) in coa.data.result.data"
                :key="index"
              >
                <td class="py-4 px-6 font-medium">
                  {{ coa.data.result.current_page * 10 - 10 + index + 1 }}
                </td>
                <td class="py-4 px-6">
                  {{ item.name }}
                </td>
                <td class="py-4 px-6">{{ item.kode }}</td>
                <td class="py-4 px-6">{{ item.laporan }}</td>
                <td class="py-4 px-6">{{ item.tipe ? 'kredit' : 'debit' }}</td>
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
                            name: 'cabang-id-coa-edit',
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
            class="flex justify-between items-center pt-4 p-2"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-gray-500"
              >Showing
              <span class="font-semibold text-gray-900">1-10</span>
              of
              <span class="font-semibold text-gray-900">{{
                coa.data.result.last_page
              }}</span></span
            >
            <ul class="inline-flex items-center -space-x-px">
              <li>
                <button
                  :value="coa.data.result.current_page - 1"
                  @click="updatePage"
                  class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  :disabled="coa.data.result.current_page == 1"
                >
                  &lt;
                </button>
              </li>
              <p v-if="$fetchState.pending">Fetching roles...</p>

              <li
                v-else
                v-for="(ada, index) in coa.data.result.links"
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
                  :disabled="pagenow == coa.data.result.last_page"
                >
                  >
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Modal from '@/components/Modal.vue'
export default {
  layout: 'dashboard',
  middleware: 'auth',

  data() {
    return {
      cabang_id: JSON.parse(localStorage.getItem('cabang_id')),
      role: JSON.parse(localStorage.getItem('role')),
      hapus: 'Konfirmasi',
      upload: 'Konfirmasi',
      modal: false,
      modalimport: false,
      modalExport: false,
      isHidden: false,
      isKredit: false,
      nextUrl: 2,
      prevUrl: null,
      keywords: null,
      pagenow: null,
      messageimport: null,
      kode: null,
      coa: [],
      jumlahCoa: [],
      file: null,
      id: null,
      index: null,
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

    isKredit() {
      this.$nuxt.refresh()
      console.log(this.isKredit)
    },
  },
  components: { Modal },

  async fetch() {
    ;(this.coa = await this.$axios.get('/coa', {
      params: {
        name: this.keywords,
        limit: 10,
        page: this.pagenow,
        cabang_id: this.cabang_id,
        tipe: this.isKredit,
      },
    })),
      (this.jumlahCoa = await this.$axios.get('/hitung/coa', {
        params: {
          cabang_id: this.cabang_id,
        },
      }))
  },

  methods: {
    ...mapActions(['toggleSidebar']),
    onFilePicked(e) {
      const formData = new FormData()
      const file = e.target.files[0]
      formData.append('file', file)
      console.log(formData)
      this.$axios
        .post('/coa/import_excel', formData)
        .then((response) => {
          console.log(response)
          this.refetch()
        })
        .catch((error) => {
          console.log(error)
          this.modalimport = true
          this.messageimport = error.response.data.message
        })
    },

    async apa() {
      try {
        let response = await this.$axios.post('/coa/import_excel', formData)

        //Redirect to my coa page
        this.$router.push({ name: 'cabang-id-coa' })

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    updatePage(event) {
      this.pagenow = parseInt(event.target.value)
      this.$nuxt.refresh()
      this.nextUrl = 1 + parseInt(event.target.value)
    },
    async refetch() {
      ;(this.coa = await this.$axios.get('/coa', {
        params: {
          name: this.keywords,
          limit: 10,
          page: this.pagenow,
          cabang_id: this.cabang_id,
          tipe: this.isKredit,
        },
      })),
        (this.jumlahCoa = await this.$axios.get('/hitung/coa', {
          params: {
            cabang_id: this.cabang_id,
          },
        }))
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

    //Method untuk export coa
    async exportExcel() {
      this.loading = true
      let newWindow = window.open()
      await this.$axios
        .get('/coa/export', {
          params: {
            cabang_id: this.cabang_id,
          },
          responseType: 'blob',
        })
        .then((response) => {
          this.loading = false
          const href = URL.createObjectURL(response.data)

          // create "a" HTML element with href to file & click
          const link = document.createElement('a')
          link.href = href
          link.setAttribute('download', 'coa.xlsx') //or any other extension
          link.setAttribute('target', '_blank') //or any other extension
          document.body.appendChild(link)
          link.click()

          // clean up "a" element & remove ObjectURL
          document.body.removeChild(link)
          URL.revokeObjectURL(href)
          this.modalExport = false
        })

      //   const response = await this.$http
      //     .get('http://lazismu-backend.test/api/kasbesar/export')
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
  },
}
</script>
