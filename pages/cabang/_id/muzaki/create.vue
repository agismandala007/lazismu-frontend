<template>
  <section class="flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Tambah Akun Muzaki</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Muzaki Account Registration <br />
    </p>
    <form class="w-full card-baru" @submit.prevent="createMuzaki">
      <p v-if="listerror" class="m-3">
        <b>Tolong Di Cek Kembali :</b>
        <ul class="list-disc">
          <p  class="text-red-500">
            {{ errors }}
          </p>
        </ul>
      </p>
 
      <div class="form-group">
        <label for="" class="text-grey">Nama</label>
        <input
          type="text"
          class="input-field"
          value="muzaki.nama"
          v-model="muzaki.nama"
          required
        />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Alamat</label>
        <input
          type="text"
          class="input-field"
          v-model="muzaki.alamat"
          value="muzaki.alamat"
          required
        />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Nomor Telpon</label>
        <input
          type="number"
          class="input-field"
          value="muzaki.noTelp"
          v-model="muzaki.noTelp"
          required
        />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">NPWP</label>
        <input
          type="number"
          class="input-field"
          value="muzaki.npwp"
          v-model="muzaki.npwp"
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
      muzaki: {
        nama: '',
        alamat: '',
        noTelp: '',
        npwp: '',
      },
      listerror: false,
      errors: [],
      home: this.$route.params.id,
    }
  },
  methods: {
    async createMuzaki() {
      try {
        //send registration data to server
        let response = await this.$axios.post('/muzaki', this.muzaki)

        //Redirect to my user page
        this.$router.push({
          name: 'cabang-id-muzaki',
          params: {
            id: this.home,
          },
        })

        console.log(response)
      } catch (error) {
       console.log(error.response.data.meta.message);
        this.errors = error.response.data.meta.message
      }
    },
  },
}
</script>
