<template>
  <section class="flex flex-col items-center justify-center px-4 mb-8">
    <div class="text-[24px] font-semibold text-dark">Edit Kas Bank</div>
    <p class="mt-2 text-base leading-7 text-center mb-[50px] text-grey"></p>
    <form class="w-full card-baru" @submit.prevent="update">
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
            :key="item.id"
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
            :key="item.id"
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
        Update
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
      id: this.$route.params.item,
    }
  },
  async fetch() {
    await this.$axios
      .get('/frontoffice', {
        params: {
          limit: 1,
          cabang_id: this.frontoffice.cabang_id,
          id: this.id,
        },
      })
      .then((response) => {
        ;(this.frontoffice.name = response.data.result.name),
          (this.frontoffice.penyetor = response.data.result.penyetor),
          (this.frontoffice.penerima = response.data.result.penerima),
          (this.frontoffice.nobuktipenerima =
            response.data.result.nobuktipenerima),
          (this.frontoffice.tanggal = response.data.result.tanggal),
          (this.frontoffice.ref = response.data.result.ref),
          (this.frontoffice.jumlah = response.data.result.jumlah),
          (this.frontoffice.tempatbayar = response.data.result.tempatbayar),
          (this.frontoffice.coadebit_id = response.data.result.coadebit_id),
          (this.frontoffice.coakredit_id = response.data.result.coakredit_id)
      }),
      (this.debit = await this.$axios.get('/coa', {
        params: {
          limit: 20,
          cabang_id: this.$route.params.id,
          tipe: false,
        },
      })),
      (this.kredit = await this.$axios.get('/coa', {
        params: {
          cabang_id: this.$route.params.id,
          limit: 20,
          tipe: 1,
        },
      }))
  },
  methods: {
    async update(e) {
      e.preventDefault()
      //send data ke Rest API untuk update
      await this.$axios
        .post(`/frontoffice/update/${this.$route.params.item}`, {
          //data yang dikirim
          name: this.frontoffice.name,
          penerima: this.frontoffice.penerima,
          penyetor: this.frontoffice.penyetor,
          nobuktipenerima: this.frontoffice.nobuktipenerima,
          tanggal: this.frontoffice.tanggal,
          ref: this.frontoffice.ref,
          jumlah: this.frontoffice.jumlah,
          tempatbayar: this.frontoffice.tempatbayar,
          coadebit_id: this.frontoffice.coadebit_id,
          coakredit_id: this.frontoffice.coakredit_id,
          cabang_id: this.frontoffice.cabang_id,
        })
        .then(() => {
          //redirect ke route "post"
          this.$router.push({
            name: 'cabang-id-frontoffices',
            params:{
              id: this.frontoffice.cabang_id,
            }
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
