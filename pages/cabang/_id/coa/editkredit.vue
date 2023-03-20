<template>
  <section class="flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Edit Data</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Kredit <i>(Chart of Account)</i> <br />
    </p>
    <form class="w-full card" @submit="update">
      <div class="form-group">
        <label for="" class="text-grey">Kode</label>
        <input type="text" class="input-field" v-model="coakredit.kode" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Nama Akun</label>
        <input type="text" class="input-field" v-model="coakredit.name" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Laporan</label>
        <input type="text" class="input-field" v-model="coakredit.laporan" />
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
      coakredit: {
        name: '',
        kode: '',
        laporan: '',
      },
      cabang_id: JSON.parse(localStorage.getItem('cabang_id')),
      id: this.$route.params.item,
    }
  },
  async fetch() {
    await this.$axios
      .get('/coakredit', {
        params: {
          limit: 1,
          cabang_id: this.cabang_id,
          id: this.id,
        },
      })
      .then((response) => {
        ;(this.coakredit.name = response.data.result.name),
          (this.coakredit.kode = response.data.result.kode),
          (this.coakredit.laporan = response.data.result.laporan)
      })
  },
  methods: {
    async update(e) {
      e.preventDefault()
      //send data ke Rest API untuk update
      await this.$axios
        .post(`/coakredit/update/${this.$route.params.item}`, {
          //data yang dikirim
          name: this.coakredit.name,
          kode: this.coakredit.kode,
          laporan: this.coakredit.laporan,
          cabang_id: this.cabang_id,
        })
        .then(() => {
          //redirect ke route "post"
          this.$router.push({
            name: 'cabang-id-coa',
          })
        })
        .catch((error) => {
          //assign error validasi
          this.validation = error.response.data
        })
    },
  },
}
</script>
