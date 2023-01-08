<template>
  <section class="flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Tambah Data</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Debit Kredit<i>(Chart of Account)</i> <br />
    </p>
    <form class="w-full card" @submit.prevent="createDebit">
      <div class="form-group">
        <label for="" class="text-grey">Kode</label>
        <input type="text" class="input-field" v-model="debit.kode" value="debit.kode" required/>
        
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Nama Akun</label>
        <input
          type="text"
          class="input-field"
          value="debit.name"
          v-model="debit.name"
          required
        />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Laporan</label>
        <input
          type="text"
          class="input-field"
          value="debit.laporan"
          v-model="debit.laporan"
          required
        />
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
      debit: {
        name: '',
        kode: '',
        laporan: '',
        cabang_id: this.$route.params.id,
        
      },
    }
  },
  methods: {

    async createDebit() {
      try {
        //send registration data to server
        let response = await this.$axios.post('/coadebit', this.debit)
        
        //Redirect to my coa page
        this.$router.push({name: 'cabang-id-coa'})

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
