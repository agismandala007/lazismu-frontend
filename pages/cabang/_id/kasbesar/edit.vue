<template>
  <section class="flex flex-col items-center justify-center px-4 mb-8">
    <div class="text-[24px] font-semibold text-dark">Edit Kas Bank</div>
    <p class="mt-2 text-base leading-7 text-center mb-[50px] text-grey"></p>
    <form class="w-full card-baru" @submit.prevent="createKasbesar">
      <div class="grid grid-cols-3 gap-4">
        <div class="form-group">
          <label for="" class="text-grey">Tanggal</label>
          <input type="date" class="input-field2" v-model="kasbesar.tanggal" />
        </div>
        <div class="form-group col-span-2">
          <label for="" class="text-grey">No Bukti Kas</label>
          <input
            type="text"
            class="input-field2"
            v-model="kasbesar.nobuktikas"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Uraian Transaksi</label>
        <input type="text" class="input-field2" v-model="kasbesar.name" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="form-group">
          <label for="" class="text-grey">Penerima</label>
          <input type="text" class="input-field2" v-model="kasbesar.penerima" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Ref</label>
          <input type="text" class="input-field2" v-model="kasbesar.ref" />
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
          <option :value="item.id" v-for="item in debit.data.result.data" :key="item">
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
          <option :value="item.id" v-for="item in kredit.data.result.data" :key="item">
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="grid grid-cols-3 gap-4">
        <div class="form-group">
          <label for="" class="text-grey">Jumlah</label>
          <input type="text" class="input-field2" v-model="kasbesar.jumlah" />
        </div>
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
  middleware: 'auth',
  data() {
    return {
      debit: [],
      kredit: [],
      kasbesar: {
        name: '',
        penerima: '',
        nobuktikas: '',
        tanggal: '',
        ref: '',
        jumlah: '',
        coadebit_id: '',
        coakredit_id: '',
        cabang_id: this.$route.params.id,
      },
      id: this.$route.params.item,
    }
  },
  async fetch() {
    await this.$axios
      .get('/kasbesar', {
        params: {
          limit: 1,
          cabang_id: this.cabang_id,
          id: this.id,
        },
      })
      .then((response) => {
        ;(this.kasbesar.name = response.data.result.name),
          (this.kasbesar.penerima = response.data.result.penerima),
          (this.kasbesar.nobuktikas = response.data.result.nobuktikas),
          (this.kasbesar.tanggal = response.data.result.tanggal),
          (this.kasbesar.ref = response.data.result.ref),
          (this.kasbesar.jumlah = response.data.result.jumlah),
          (this.kasbesar.coadebit_id = response.data.result.coadebit_id),
          (this.kasbesar.coakredit_id = response.data.result.coakredit_id)
      }),
      (this.debit = await this.$axios.get('/coadebit', {
        params: {
          limit: 20,
          cabang_id: this.$route.params.id,
        },
      })),
      (this.kredit = await this.$axios.get('/coakredit', {
        params: {
          cabang_id: this.$route.params.id,
          limit: 20,
        },
      }))
  },
  methods: {
    async update(e) {
      e.preventDefault()
      //send data ke Rest API untuk update
      await this.$axios
        .post(`/kasbesar/update/${this.$route.params.item}`, {
          //data yang dikirim
          name: this.kasbesar.name,
          penerima: this.kasbesar.penerima,
          nobuktikas: this.kasbesar.nobuktikas,
          tanggal: this.kasbesar.tanggal,
          ref: this.kasbesar.ref,
          jumlah: this.kasbesar.jumlah,
          coadebit_id: this.kasbesar.coadebit_id,
          coakredit_id: this.kasbesar.coakredit_id,
          cabang_id: this.cabang_id,
        })
        .then(() => {
          //redirect ke route "post"
          this.$router.push({
            name: 'cabang-id-kasbesar',
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
