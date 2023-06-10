<template>
  <section class="flex flex-col items-center justify-center px-4 mb-8">
    <div class="text-[24px] font-semibold text-dark">Edit Data User</div>
    <p class="mt-2 text-base leading-7 text-center mb-[50px] text-grey"></p>
    <div class="w-full card-baru">
      <form class="w-full card-baru" @submit.prevent="update">
        <p v-if="listerror" class="m-3">
        <b>Tolong Di Cek Kembali :</b>
        <ul class="list-disc">
          <li v-for="error in errors" :key="error" class="text-red-500">
          {{ error[0] }}
          </li>
        </ul>
      </p>
        <div class="grid grid-cols-2 gap-4">
          <div class="form-group">
            <label for="" class="text-grey">Name</label>
            <input type="text" class="input-field2" v-model="user.name" />
          </div>
          <div class="form-group">
            <label for="" class="text-grey">Email</label>
            <input type="email" class="input-field2" v-model="user.email" />
          </div>
        </div>
        <div class="form-group">
        <label for="" class="text-grey">Password Baru    <small class="text-red-400">(kosongkan bila tidak perlu mengganti)</small></label>

        <input
          type="password"
          class="input-field"
          value="user.password"
          v-model="user.password"
          
        />
      </div>
      <div class="form-group">
          <label for="" class="text-grey">Pilih Role </label>
          <p v-if="$fetchState.pending">Fetching Role...</p>
          <select
            v-else
            v-model="user.role"
            name="role"
            id=""
            class="appearance-none input-field2 form-icon-chevron_down w-9/12"
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
          Update
        </button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'form',
  middleware: 'auth',
  data() {
    return {
      user: {
        name: '',
        email: '',
        role: '',
        cabang_id: '',
        password: '',
      },
      cabang_id: this.$route.params.id,
      id: this.$route.params.item,
      inputType: false,
      listerror: false,
      errors: [],
      cabang:[],
    }
  },
  watch: {
    errors(){
      this.listerror = true
    }
  },
  async fetch() {
    await this.$axios
      .get('/userall', {
        params: {
          limit: 1,
          id: this.id,
        },
      })
      .then((response) => {
        ;(this.user.name = response.data.result.name),
          (this.user.email = response.data.result.email),
          (this.user.password = response.data.result.password),
          (this.user.role = response.data.result.role),
          (this.user.cabang_id = response.data.result.cabang_id)
      }),
      (this.cabang = await this.$axios.get('/cabang', {
      params: {
        limit: 100,
        cabang_id: this.cabang_id,
      },
    }))
  },
  methods: {
    async update(e) {
      e.preventDefault()
      //send data ke Rest API untuk update
      await this.$axios
        .post(`/user/update/${this.$route.params.item}`, {
          //data yang dikirim
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          role: this.user.role,
          cabang_id: this.user.cabang_id,
        })
        .then(() => {
          //redirect ke route "post"
          this.$router.push({
            name: 'cabang-id-user',
            params: {
              id: this.cabang_id,
            },
          })
        })
        .catch((error) => {
          //assign error validasi

          this.errors= error.response.data.errors
        })
    },
  },
}
</script>
