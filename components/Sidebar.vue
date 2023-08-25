<template>
  <div>
    <div
      class="fixed lg:max-w-[295px] w-full overflow-y-auto h-full bg-white z-[999]"
      :class="sidebar ? 'block' : 'hidden'"
      id="sidebarHRIS"
    >
      <div class="px-6 py-[50px] gap-y-[50px] flex flex-col">
        <div class="flex items-center justify-between">
          <a href="#" class="flex justify-center">
            <img src="/assets/svgs/logo-type.svg" alt="" />
          </a>
          <a
            href="#"
            id="toggleCloseSidebar"
            class="lg:hidden"
            @click="toggleSidebar"
          >
            <svg
              class="w-6 h-6 text-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </a>
        </div>
        <div class="flex flex-col gap-4">
          <div class="text-sm text-grey">Menu utama</div>
          <NuxtLink
            v-if="role === 1 || 2 || 3"
            :to="{ name: 'cabang-id-overview', params: { id: cabang_id } }"
            class="nav-link"
          >
            <img src="/assets/svgs/ic-grid.svg" alt="" />
            Beranda
          </NuxtLink>
          <NuxtLink
            v-if="role !== 2"
            :to="{ name: 'cabang-id-coa', params: { id: cabang_id } }"
            class="nav-link"
          >
            <img src="/assets/svgs/ic-users.svg" alt="" />
            COA
          </NuxtLink>
          <NuxtLink
            v-if="role === 1 || 2 || 3"
            :to="{ name: 'cabang-id-frontoffices', params: { id: cabang_id } }"
            class="nav-link"
          >
            <img src="/assets/svgs/ic-briefcase.svg" alt="" />
            Front Offices
          </NuxtLink>
          <NuxtLink
            v-if="role !== 2"
            :to="{ name: 'cabang-id-kasbesar', params: { id: cabang_id } }"
            class="nav-link"
          >
            <img src="/assets/svgs/ic-flag.svg" alt="" />
            Kas Besar
          </NuxtLink>
          <NuxtLink
            v-if="role !== 2"
            :to="{ name: 'cabang-id-kaskecil', params: { id: cabang_id } }"
            class="nav-link"
          >
            <img src="/assets/svgs/ic-flag.svg" alt="" />
            Kas Kecil
          </NuxtLink>
          <NuxtLink
            v-if="role !== 2"
            :to="{ name: 'cabang-id-kasbank', params: { id: cabang_id } }"
            class="nav-link"
          >
            <img src="/assets/svgs/ic-box.svg" alt="" />
            Kas Bank
          </NuxtLink>
          <NuxtLink
            v-if="role !== 2"
            :to="{ name: 'cabang-id-jurnalumum', params: { id: cabang_id } }"
            class="nav-link"
          >
            <img src="/assets/svgs/ic-document.svg" alt="" />
            Jurnal Umum
          </NuxtLink>
        </div>
        <div class="flex flex-col gap-4">
          <div class="text-sm text-grey">Others</div>
          <NuxtLink
            v-if="role === 1"
            :to="{ name: 'cabang-id-cabang', params: { id: cabang_id } }"
            class="nav-link"
          >
            <img src="/assets/svgs/ic-home.svg" alt="" />
            Cabang
          </NuxtLink>
          <NuxtLink
            v-if="role === 1"
            :to="{ name: 'cabang-id-user', params: { id: cabang_id } }"
            class="nav-link"
          >
            <img src="/assets/svgs/ic-home.svg" alt="" />
            User
          </NuxtLink>

          <NuxtLink
            v-if="role === 1"
            :to="{ name: 'cabang-id-muzaki', params: { id: cabang_id } }"
            class="nav-link"
          >
            <img src="/assets/svgs/ic-home.svg" alt="" />
            Muzakki
          </NuxtLink>

          <button @click="logout" class="nav-link">
            <img src="/assets/svgs/ic-signout.svg" alt="" />
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      role: JSON.parse(localStorage.getItem('role')),
      cabang_id: JSON.parse(localStorage.getItem('cabang_id')),
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.sidebar
    },
  },
  methods: {
    ...mapActions(['openSidebar']),
    ...mapActions(['toggleSidebar']),
    async logout() {
      localStorage.removeItem('cabang_id')
      localStorage.removeItem('role')
      await this.$auth.logout()
    },
  },
}
</script>

<style>
a.nuxt-link-active {
  @apply bg-lazismu rounded-2xl text-white font-semibold;
}

a.nuxt-link-exact-active {
  @apply p-[11px] flex items-center gap-4;
}
.nuxt-link-active img {
  @apply brightness-0 invert;
}
</style>
