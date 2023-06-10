<template>
  <section class="flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Edit Data</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Coa <i>(Chart of Account)</i> <br />
    </p>
    <form class="w-full card" @submit="update">
      <p v-if="listerror" class="m-3">
        <b>Tolong Di Cek Kembali :</b>
        <ul class="list-disc">
          <li v-for="error in errors" :key="error" class="text-red-500">
          {{ error[0] }}
          </li>
        </ul>
      </p>
      <div class="form-group">
        <label for="" class="text-grey">Kode</label>
        <input type="text" class="input-field" v-model="coa.kode" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Nama Akun</label>
        <input type="text" class="input-field" v-model="coa.name" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Laporan</label>
        <input type="text" class="input-field" v-model="coa.laporan" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Tipe</label>
        <select
          name="tipe"
          id=""
          v-model="coa.tipe"
          class="input-field rounded-lg"
          :value="coa.tipe"
        >
          <option value="0">Debit</option>
          <option value="1">Kredit</option>
        </select>
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
  // middleware: 'auth',
  data() {
    return {
      coa: {
        name: '',
        kode: '',
        laporan: '',
        tipe: '',
      },
      listerror : false,
      errors: [],
      cabang_id: JSON.parse(localStorage.getItem('cabang_id')),
      id: this.$route.params.item,
    }
  },
  watch: {
    errors(){
      this.listerror = true
    }
  },
  async fetch() {
    await this.$axios
      .get('/coa', {
        params: {
          limit: 1,
          cabang_id: this.cabang_id,
          id: this.id,
        },
      })
      .then((response) => {
        ;(this.coa.name = response.data.result.name),
          (this.coa.kode = response.data.result.kode),
          (this.coa.laporan = response.data.result.laporan),
          (this.coa.tipe = response.data.result.tipe)
      })
  },
  methods: {
    async update(e) {
      e.preventDefault()
      //send data ke Rest API untuk update
      await this.$axios
        .post(`/coa/update/${this.$route.params.item}`, {
          //data yang dikirim
          name: this.coa.name,
          kode: this.coa.kode,
          laporan: this.coa.laporan,
          cabang_id: this.cabang_id,
          tipe: this.coa.tipe,
        })
        .then(() => {
          //redirect ke route "post"
          this.$router.push({
            name: 'cabang-id-coa',
            params: {
            id: this.coa.cabang_id,
          },
          })
        })
        .catch((error) => {
          //assign error validasi
          this.errors = error.response.data.errors
          
        })
    },
  },
}
</script>
