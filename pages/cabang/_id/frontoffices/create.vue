<template>
  <section class="flex flex-col items-center justify-center px-4 mb-8">
    <div class="text-[24px] font-semibold text-dark">Tambah Data</div>
    <p class="mt-2 text-base leading-7 text-center mb-[50px] text-grey">
      Front Office <br />
    </p>
    <form class="w-full card-baru" @submit.prevent="createFrontoffice">
      <p v-if="listerror" class="m-3">
        <b>Tolong Di Cek Kembali :</b>
        <ul class="list-disc">
          <li v-for="error in errors" :key="error[0]" class="text-red-500">
          {{ error[0] }}
          </li>
        </ul>
      </p>
      <div class="grid grid-cols-3 gap-4">
        <div class="form-group">
          <label for="" class="text-grey">Tanggal</label>
          <input
            type="date"
            class="input-field2"
            v-model="frontoffice.tanggal"
          />
        </div>
        <div class="form-group col-span-2">
          <label for="" class="text-grey">No Bukti Penerima</label>
          <input
            type="text"
            class="input-field2"
            v-model="frontoffice.nobuktipenerima"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Uraian Transaksi</label>
        <input type="text" class="input-field2" v-model="frontoffice.name" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label for="" class="text-grey">Muzakki</label>
          <input
            type="text"
            class="input-field2"
            v-model="frontoffice.penyetor"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Penerima</label>
          <input
            type="text"
            class="input-field2"
            v-model="frontoffice.penerima"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Pilih Akun Debit</label>
        <p v-if="$fetchState.pending">Fetching debits...</p>
        <select
          v-else
          v-model="frontoffice.coadebit_id"
          name="debit"
          id=""
          class="appearance-none input-field2 form-icon-chevron_down w-9/12"
        >
          <option
            :value="item.id"
            v-for="item in debit.data.result.data"
            :key="item"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Pilih Akun Kredit</label>
        <p v-if="$fetchState.pending">Fetching roles...</p>
        <select
          v-else
          v-model="frontoffice.coakredit_id"
          name="kredit"
          id=""
          class="appearance-none input-field2 form-icon-chevron_down w-9/12"
        >
          <option
            :value="item.id"
            v-for="item in kredit.data.result.data"
            :key="item"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="form-group">
          <label for="" class="text-grey">Jumlah</label>
          <input
            type="text"
            class="input-field2"
            v-model="frontoffice.jumlah"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tempat Bayar</label>
          <input
            type="text"
            class="input-field2"
            v-model="frontoffice.tempatbayar"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Ref</label>
          <input type="text" class="input-field2" v-model="frontoffice.ref" />
        </div>
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
  middleware: 'auth',
  data() {
    return {
      debit: [],
      kredit: [],
      frontoffice: {
        name: '',
        penyetor: '',
        penerima: '',
        nobuktipenerima: '',
        tanggal: '',
        ref: '',
        jumlah: '',
        tempatbayar: '',
        coadebit_id: '',
        coakredit_id: '',
        cabang_id: this.$route.params.id,
      },
      listerror: false,
      errors: [],
      cabang_id: this.$route.params.id,
    }
  },
  async fetch() {
    ;(this.debit = await this.$axios.get('/coa', {
      params: {
        limit: 120,
        cabang_id: this.cabang_id,
        tipe: false,
      },
    })),
      (this.kredit = await this.$axios.get('/coa', {
        params: {
          limit: 120,
          cabang_id: this.cabang_id,
          tipe: 1,
        },
      }))
  },
  methods: {
    async createFrontoffice() {
      try {
        //send registration data to server
        let response = await this.$axios.post('/frontoffice', this.frontoffice)

        //Redirect to my frontoffice page
        this.$router.push({ 
          name: 'cabang-id-frontoffices',
          params: {
            id: this.cabang_id,
          }, 
        })

        console.log(response)
      } catch (error) {
        this.errors = error.response.data.errors
        this.listerror = true
      }
    },
  },
}
</script>
