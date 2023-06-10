<template>
  <section class="flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Tambah Data</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      User Registrasi <br />
    </p>
    <form class="w-full card-baru" @submit.prevent="createUser">
      <p v-if="listerror" class="m-3">
        <b>Tolong Di Cek Kembali :</b>
        <ul class="list-disc">
          <p  class="text-red-500">
            {{ errors }}
          </p>
        </ul>
      </p>
 
      <div class="grid gap-4 grid-cols-3">
          <div class="form-group">
            <label for="" class="text-grey">Nama</label>
            <input
              type="text"
              class="input-field"
              value="user.name"
              v-model="user.name"
              required
            />
          </div>
        <div class="col-span-2">
          <div class="form-group">
            <label for="" class="text-grey">Email</label>
            <input
              type="email"
              class="input-field"
              v-model="user.email"
              value="user.email"
              required
            />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Password</label>
        <input
          type="password"
          class="input-field"
          value="user.password"
          v-model="user.password"
          required
        />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Role</label>
        <select
          name="role"
          id=""
          v-model="user.role"
          class="input-field2 form-icon-chevron_down appearance-none w-9/12"
          :value="user.role"
        >
          <option value="2">Front Office</option>
          <option value="3">Back Office</option>
        </select>
      </div>
      <div class="form-group">
          <label for="" class="text-grey">Pilih Cabang </label>
          <p v-if="$fetchState.pending">Fetching cabang...</p>
          <select
            v-else
            v-model="user.cabang_id"
            name="debit"
            id=""
            class="appearance-none input-field2 form-icon-chevron_down w-9/12"
          >
            <option
              :value="item.id"
              v-for="item in cabang.data.result.data"
              :key="'B' + item.id"
            >
              {{ item.name }}
            </option>
          </select>
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
      user: {
        name: '',
        email: '',
        password: '',
        cabang_id: this.$route.params.id,
        role: '',
      },
      cabang: [],
      listerror: false,
      errors: [],
    }
  },
  async fetch() {
    ;(this.cabang = await this.$axios.get('/cabang', {
      params: {
        limit: 100,
        cabang_id: this.cabang_id,
      },
    }))
  },
  watch: {
    errors(){
      this.listerror = true
    }
  },
  methods: {
    async createUser() {
      try {
        //send registration data to server
        let response = await this.$axios.post('/register', this.user)

        //Redirect to my user page
        this.$router.push({
          name: 'cabang-id-user',
          params: {
            id: this.user.cabang_id,
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
