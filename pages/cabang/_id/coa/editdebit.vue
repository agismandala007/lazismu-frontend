<template>
  <section class="flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Edit Data</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Debit <i>(Chart of Account)</i> <br />
    </p>
    <form class="w-full card" @submit="update">
      <div class="form-group">
        <label for="" class="text-grey">Kode</label>
        <input type="text" class="input-field" v-model="debit.kode" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Nama Akun</label>
        <input type="text" class="input-field" v-model="debit.name"/>
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Laporan</label>
        <input type="text" class="input-field" v-model="debit.laporan"/>
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
      debit: {
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
      .get('/coadebit', {
        params: {
          limit: 1,
          cabang_id: this.cabang_id,
          id: this.id,
        },
      }).then(response => {
            this.debit.name   = response.data.result.name,
            this.debit.kode = response.data.result.kode,
            this.debit.laporan = response.data.result.laporan
        })
    },
  methods: {
    async update(e) {
        e.preventDefault()
        //send data ke Rest API untuk update
        await this.$axios.post(`/coadebit/update/${this.$route.params.item}`, {

            //data yang dikirim
            name: this.debit.name,
            kode: this.debit.kode,
            laporan: this.debit.laporan,
            cabang_id: this.cabang_id
          })
          .then(() => {
            
            //redirect ke route "post"
            this.$router.push({
              name: 'cabang-id-coa'
            })

          })
          .catch(error => {
            //assign error validasi  
            this.validation = error.response.data
          })
    },
  }
}
</script>
