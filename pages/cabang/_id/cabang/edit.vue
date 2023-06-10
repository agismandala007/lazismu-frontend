<template>
  <section class="flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Edit Data</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Cabang <br />
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
        <label for="" class="text-grey">Nama Cabang</label>
        <input type="text" class="input-field" v-model="cabang.name" />
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
      cabang: {
        name: '',
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
      .get('/cabang', {
        params: {
          limit: 1,
          id: this.id,
        },
      })
      .then((response) => {
        ;(this.cabang.name = response.data.result.name)
      })
  },
  methods: {
    async update(e) {
      e.preventDefault()
      //send data ke Rest API untuk update
      await this.$axios
        .post(`/cabang/update/${this.$route.params.item}`, {
          //data yang dikirim
          name: this.cabang.name,
          
        })
        .then(() => {
          //redirect ke route "post"
          this.$router.push({
            name: 'cabang-id-cabang',
            params: {
            id: this.cabang.cabang_id,
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
