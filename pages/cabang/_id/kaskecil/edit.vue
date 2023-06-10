<template>
  <section class="flex flex-col items-center justify-center px-4 mb-8">
    <div class="text-[24px] font-semibold text-dark">Edit Kas Kecil</div>
    <p class="mt-2 text-base leading-7 text-center mb-[50px] text-grey"></p>
    <div class="w-full card-baru">

      <div class="flex mb-8 justify-center">
        <button class="bg-red-700 text-white px-4 py-2 mr-0 rounded-l-lg hover:bg-red-800"
          :class="{ 'bg-opacity-50': !inputType }" @click.prevent="changeDataPengeluaran">
          Pengeluaran
        </button>
        <button class="bg-green-700 text-white px-4 py-2 ml-0 rounded-r-lg hover:bg-green-800"
          :class="{ 'bg-opacity-50': inputType }" @click="changeDataPemasukan">
          Pemasukan
        </button>

      </div>
      <p v-if="listerror" class="m-3">
        <b>Tolong Di Cek Kembali :</b>
      <ul class="list-disc">
        <li v-for="error in errors" :key="error" class="text-red-500">
          {{ error[0] }}
        </li>
      </ul>
      </p>
      <form class="w-full card-baru" @submit.prevent="update">
        <div class="grid grid-cols-3 gap-4">
          <div class="form-group">
            <label for="" class="text-grey">Tanggal</label>
            <input type="date" class="input-field2" v-model="kaskecil.tanggal" />
          </div>
          <div class="form-group col-span-2">
            <label for="" class="text-grey">No Bukti Kas</label>
            <input type="text" class="input-field2" v-model="kaskecil.nobuktikas" />
          </div>
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Uraian Transaksi</label>
          <input type="text" class="input-field2" v-model="kaskecil.name" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="" class="text-grey">Penerima</label>
            <input type="text" class="input-field2" v-model="kaskecil.penerima" />
          </div>
          <div class="form-group">
            <label for="" class="text-grey">Ref</label>
            <input type="text" class="input-field2" v-model="kaskecil.ref" />
          </div>
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Pilih Akun Debit</label>
          <p v-if="$fetchState.pending">Fetching debits...</p>
          <select v-else v-model="kaskecil.coadebit_id" name="debit" id=""
            class="appearance-none input-field2 form-icon-chevron_down w-9/12">
            <option :value="coak.id" v-for="coak in debit.data.result.data" :key="'B' + coak.id">
              {{ coak.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Pilih Akun Kredit</label>
          <p v-if="$fetchState.pending">Fetching roles...</p>
          <select v-else v-model="kaskecil.coakredit_id" name="kredit" id=""
            class="appearance-none input-field2 form-icon-chevron_down w-9/12">
            <option :value="item.id" v-for="item in kredit.data.result.data" :key="'A' + item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div class="form-group">
            <label for="" class="text-grey">Jumlah</label>
            <input type="text" class="input-field2" v-model="kaskecil.jumlah" />
          </div>
        </div>
        <button type="submit" class="w-full btn btn-lazismu mt-[14px]">
          Update
        </button>
      </form>
    </div>
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
      kaskecil: {
        name: '',
        penerima: '',
        nobuktikas: '',
        tanggal: '',
        ref: '',
        jumlah: '',
        coadebit_id: '',
        coakredit_id: '',
        jenis_data: '',
        cabang_id: this.$route.params.id,
      },
      id: this.$route.params.item,
      inputType: '',
      cabang: [],
      listerror: false,
      errors: [],
    }
  },
  async fetch() {
    (this.debit = await this.$axios.get('/coa', {
        params: {
          limit: 100,
          cabang_id: this.$route.params.id,
          tipe: false,
        },
      })),
      (this.kredit = await this.$axios.get('/coa', {
        params: {
          cabang_id: this.$route.params.id,
          limit: 100,
          tipe: 1,
        },
      }))
    await this.$axios
      .get('/kaskecil', {
        params: {
          limit: 1,
          cabang_id: this.kaskecil.cabang_id,
          id: this.id,
        },
      })
      .then((response) => {
        if (response.data.result.jenis_data === 1) {
          this.inputType = true
          this.change()
        } else {
          this.inputType = false
        }
        ; (this.kaskecil.name = response.data.result.name),
          (this.kaskecil.penerima = response.data.result.penerima),
          (this.kaskecil.nobuktikas = response.data.result.nobuktikas),
          (this.kaskecil.tanggal = response.data.result.tanggal),
          (this.kaskecil.ref = response.data.result.ref),
          (this.kaskecil.jumlah = response.data.result.jumlah),
          this.kaskecil.coadebit_id = response.data.result.coadebit_id;
        this.kaskecil.coakredit_id = response.data.result.coakredit_id;
        (this.kaskecil.jenis_data = response.data.result.jenis_data)


      })

      
  },
  methods: {
    changeDataPengeluaran() {
      if (this.inputType === false) {
        console.log('ganti ke pengeluaran')
        this.kaskecil.jenis_data = 1
        this.inputType = true
        this.temp = this.debit
        this.debit = this.kredit
        this.kredit = this.temp
      }
      console.log('tetap')
    },
    changeDataPemasukan() {
      if (this.inputType === true) {
        this.inputType = false
        this.kaskecil.jenis_data = 0
        this.temp = this.debit
        this.debit = this.kredit
        this.kredit = this.temp
        console.log('ganti ke pemasukan')
      }
    },
    change()
    {
      this.inputType = true
        this.temp = this.debit
        this.debit = this.kredit
        this.kredit = this.temp
    },
    async update(e) {
      e.preventDefault()
      //send data ke Rest API untuk update
      await this.$axios
        .post(`/kaskecil/update/${this.$route.params.item}`, {
          //data yang dikirim
          name: this.kaskecil.name,
          penerima: this.kaskecil.penerima,
          nobuktikas: this.kaskecil.nobuktikas,
          tanggal: this.kaskecil.tanggal,
          ref: this.kaskecil.ref,
          jumlah: this.kaskecil.jumlah,
          coadebit_id: this.kaskecil.coadebit_id,
          coakredit_id: this.kaskecil.coakredit_id,
          cabang_id: this.kaskecil.cabang_id,
          jenis_data: this.kaskecil.jenis_data,
        })
        .then(() => {
          //redirect ke route "post"
          this.$router.push({
            name: 'cabang-id-kaskecil',
            params: {
              id: this.kaskecil.cabang_id,
            },
          })
        })
        .catch((error) => {
          //assign error validasi
          this.errors = error.response.data.errors
          this.listerror = true
        })
    },
  },
}
</script>
