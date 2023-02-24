<template>
  <section class="flex flex-col items-center justify-center px-4 mb-8">
    <div class="text-[24px] font-semibold text-dark">Tambah Data</div>
    <p class="mt-2 text-base leading-7 text-center mb-[50px] text-grey">
      Kas Besar<br />
    </p>
    <form class="w-full card-baru" @submit.prevent="createKasbesar">
      <div class="grid grid-cols-3 gap-4">
        <div class="form-group ">
          <label for="" class="text-grey">Tanggal</label>
          <input
            type="date"
            class="input-field2"
            required
            v-model="kasbesar.tanggal"
          />
        </div>
        <div class="form-group col-span-2">
          <label for="" class="text-grey">No Bukti Penerima</label>
          <input type="text" class="input-field2" v-model="kasbesar.nobuktikas" required/>
        </div>
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Uraian Transaksi</label>
        <input
          type="text"
          class="input-field2"
          v-model="kasbesar.name"
        />
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label for="" class="text-grey">Penerima</label>
          <input type="text" class="input-field2" v-model="kasbesar.penerima" />
        </div>

      </div>
      <div class="form-group">
        <label for="" class="text-grey">Pilih Akun Debit</label>
        <p v-if="$fetchState.pending">Fetching debits...</p>
        <select
          v-else
          v-model="kasbesar.coadebit_id"
          name="debit"
          id=""
          class="appearance-none input-field2 form-icon-chevron_down w-9/12"
        >             
          <option :value="item.id" v-for="item in debit.data.result.data" :key="'B'+item.id" >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Pilih Akun Kredit</label>
        <p v-if="$fetchState.pending">Fetching roles...</p>
        <select
          v-else
          v-model="kasbesar.coakredit_id"
          name="kredit"
          id=""
          class="appearance-none input-field2 form-icon-chevron_down w-9/12"
        > 
          <option :value="item2.id" v-for="item2 in kredit.data.result.data" :key="'A'+item2.id">
            {{ item2.name }}
          </option>
        </select>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label for="" class="text-grey">Jumlah</label>
          <input type="text" class="input-field2" v-model="kasbesar.jumlah" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Ref</label>
          <input type="text" class="input-field2" v-model="kasbesar.ref" />
        </div>

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
  middleware: 'auth',
  data() {
    return {
      debit: [],
      kredit: [],
      kasbesar: {
        name: '',
        penerima: '',
        nobuktikas: '',
        tanggal: '2022-01-02',
        ref: '',
        jumlah: '',
        coadebit_id: '',
        coakredit_id: '',
        cabang_id: this.$route.params.id,
      },
      cabang_id: this.$route.params.id,
    }
  },
  async fetch() {
    this.debit = await this.$axios.get('/coadebit', {
      params: {
        limit: 100,
        cabang_id: this.cabang_id
      },
    }),
    this.kredit = await this.$axios.get('/coakredit', {
      params: {
          limit: 100,
          cabang_id: this.cabang_id
      },
    })
  },
  methods: {
    async createKasbesar() {
      try {
        //send registration data to server
        let response = await this.$axios.post('/kasbesar', this.kasbesar)
        //Redirect to my kasbesar page
        this.$router.push({name: 'cabang-id-kasbesar'})
        console.log(response)

      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
