<template>
  <section class="flex flex-col items-center justify-center px-4 mb-8">
    <div class="text-[24px] font-semibold text-dark">Edit Jurnal Umum</div>
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
            v-model="jurnalumum.tanggal"
          />
        </div>
        <div class="form-group col-span-2">
          <label for="" class="text-grey">No Bukti</label>
          <input
            type="text"
            class="input-field2"
            v-model="jurnalumum.nobukti"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Uraian Transaksi</label>
        <input type="text" class="input-field2" v-model="jurnalumum.name" />
      </div>

      <div class="form-group">
        <label for="" class="text-grey">Pilih Akun Debit</label>
        <p v-if="$fetchState.pending">Fetching debits...</p>
        <select
          v-else
          v-model="jurnalumum.coadebit_id"
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
          v-model="jurnalumum.coakredit_id"
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
            v-model="jurnalumum.jumlah"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Ref</label>
          <input type="text" class="input-field2" v-model="jurnalumum.ref" />
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
      jurnalumum: {
        name: '',
        penyetor: '',
        penerima: '',
        nobukti: '',
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
      .get('/jurnalumum', {
        params: {
          limit: 1,
          cabang_id: this.jurnalumum.cabang_id,
          id: this.id,
        },
      })
      .then((response) => {
        ;(this.jurnalumum.name = response.data.result.name),
          (this.jurnalumum.penyetor = response.data.result.penyetor),
          (this.jurnalumum.penerima = response.data.result.penerima),
          (this.jurnalumum.nobukti =
            response.data.result.nobukti),
          (this.jurnalumum.tanggal = response.data.result.tanggal),
          (this.jurnalumum.ref = response.data.result.ref),
          (this.jurnalumum.jumlah = response.data.result.jumlah),
          (this.jurnalumum.tempatbayar = response.data.result.tempatbayar),
          (this.jurnalumum.coadebit_id = response.data.result.coadebit_id),
          (this.jurnalumum.coakredit_id = response.data.result.coakredit_id)
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
        .post(`/jurnalumum/update/${this.$route.params.item}`, {
          //data yang dikirim
          name: this.jurnalumum.name,
          penerima: this.jurnalumum.penerima,
          penyetor: this.jurnalumum.penyetor,
          nobukti: this.jurnalumum.nobukti,
          tanggal: this.jurnalumum.tanggal,
          ref: this.jurnalumum.ref,
          jumlah: this.jurnalumum.jumlah,
          tempatbayar: this.jurnalumum.tempatbayar,
          coadebit_id: this.jurnalumum.coadebit_id,
          coakredit_id: this.jurnalumum.coakredit_id,
          cabang_id: this.jurnalumum.cabang_id,
        })
        .then(() => {
          //redirect ke route "post"
          this.$router.push({
            name: 'cabang-id-jurnalumum',
            params:{
              id: this.jurnalumum.cabang_id,
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
