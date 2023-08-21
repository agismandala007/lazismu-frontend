<template>
  <section class="flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Tambah Data</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Coa Kredit<i>(Chart of Account)</i> <br />
    </p>
    <form class="w-full card" @submit.prevent="createCoa">
      <p v-if="listerror" class="m-3">
        <b>Tolong Di Cek Kembali :</b>
        <ul class="list-disc">
          <li v-for="error in errors" :key="error[0]" class="text-red-500">
          {{ error[0] }}
          </li>
        </ul>
      </p>
      <!-- <button @click="fetch">Ambil Data</button>
      <table>
        <tr>
          <th>Nama</th>
          <th>Alamat</th>
        </tr>
        <tr for="item in data" :key="data">
          <td>{{item.nama}}</td>
          <td>{{item.alamat}}</td>
        </tr>
      </table> -->
      <div class="form-group">
        <label for="" class="text-grey">Kode</label>
        <input
          type="text"
          class="input-field"
          v-model="coa.kode"
          value="coa.kode"
          required
        />
      </div>

      <div class="form-group">
        <label for="" class="text-grey">Nama Akun</label>
        <div class="flex content-center space-x-3">
          <input
            id="nama"
            type="text"
            class="input-field w-4/5"
            v-model="name"
            @focus="toggleFocus(true)"
            required
          />

          <NuxtLink
            :to="{
              name: 'cabang-id-muzaki-create',
              params: { id: cabang_id },
            }"
            class="btn-sm px-4 py-3 rounded-lg bg-orange-400 text-sm text-white"
          >
            +
          </NuxtLink>
        </div>
      </div>

      <div v-if="isFocus">
        <ul v-for="user in data">
          <li :key="user.id" @click="handleAddUser(user.nama)" class="bg-gray-50 hover:bg-gray-200 cursor-pointer">{{ user.nama }}</li>
        </ul>
      </div>

      <div class="form-group">
        <label for="" class="text-grey">Laporan</label>
        <input
          type="text"
          class="input-field"
          value="coa.laporan"
          v-model="coa.laporan"
          required
        />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Tipe</label>
        <select
          name="tipe"
          id=""
          v-model="coa.tipe"
          class="input-field rounded-lg block p-2.5 text-sm"
          
        >
          <option value="0">Debit</option>
          <option value="1">Kredit</option>
        </select>
      </div>
      <button type="submit" class="w-full btn btn-lazismu mt-[14px]">
        Create
      </button>
    </form>
  </section>
</template>

<script>
export default {
  layout: 'form',
  // middleware: 'auth',
  data() {
    return {
      coa: {
        name: '',
        kode: '',
        laporan: '',
        // cabang_id: this.$route.params.id,
        tipe: '',
      },
      name: '',
      isFocus: false,
      listerror: false,
      errors: [],
      data: [],
    }
  },

  methods: {
    toggleFocus(value = true) {
      this.isFocus = value
      if(value) {
        this.fetch()
      }
    },
    handleAddUser(name) {
      this.name = name
      this.isFocus = false
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

    async createCoa() {
      try {
        //send registration data to server
        let response = await this.$axios.post('/coa', this.coa)

        //Redirect to my coa page
        this.$router.push({
          name: 'cabang-id-coa',
          params: {
            id: this.coa.cabang_id,
          },
        })

        console.log(response)
      } catch (error) {
        console.log(error)
        this.errors = error.response.data.errors
        this.listerror = true
      }
    },
  }
}
</script>
