<template>
  <section class="flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Tambah Data</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Cabang Untuk Login <br />
    </p>
    <form class="w-full card" @submit.prevent="createCabang">
      <p v-if="listerror" class="m-3">
        <b>Tolong Di Cek Kembali :</b>
        <ul class="list-disc">
          <li v-for="error in errors" :key="error" class="text-red-500">
          {{ error[0] }}
          </li>
        </ul>
      </p>
      <div class="form-group">
        <label for="" class="text-grey">Nama Cabang</label>
        <input
          type="text"
          class="input-field"
          value="cabang.name"
          v-model="cabang.name"
          required
        />
      </div>

      <button type="submit" class="w-full btn btn-lazismu mt-[20px]">
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
      cabang: {
        name: '',
      },
      listerror : false,
      errors: [],
      cabang_id: this.$route.params.id,
    }
  },
  methods: {
    async createCabang() {
      try {
        //send registration data to server
        let response = await this.$axios.post('/cabang', this.cabang)

        //Redirect to my cabang page
        this.$router.push({
          name: 'cabang-id-cabang',
          params: {
            id: this.cabang.cabang_id,
          },
        })

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
