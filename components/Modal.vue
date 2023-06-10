<template>
  <div class="modal">
    <div
      v-show="toogleModal"
      id="popup-modal"
      tabindex="-1"
      class="fixed overflow-x-hidden overflow-y-auto inset-0 z-50 w-full h-screen flex items-center justify-center bg-semi-75"
    >
      <div class="relative w-full h-full max-w-md md:h-auto">
        <div class="relative bg-white rounded-lg shadow">
          <button
            @click="close()"
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-hide="popup-modal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-6 text-center">
            <svg
              aria-hidden="true"
              class="mx-auto mb-4 text-gray-400 w-14 h-14"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500">
              <slot />
            </h3>
            <button
              @click="onClick"
              data-modal-hide="popup-modal"
              type="button"
              class="text-white focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              :class="
                action
                  ? 'bg-green-600  hover:bg-green-800'
                  : 'bg-red-600  hover:bg-red-800'
              "
            >
              {{ action }}
              {{ wrongaction }}
            </button>
            <button
              @click="close()"
              data-modal-hide="popup-modal"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Tidak
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="toogleModal"
      class="fixed inset-0 z-40 opacity-25 bg-black"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    toogleModal: {
      type: Boolean,
      required: false,
    },
    action: {
      type: String,
      required: false,
    },
    wrongaction: {
      type: String,
      required: false,
    },
    close: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {}
  },
  watch: {
    toogleModal(after, before) {
      console.log(this.toogleModal)
    },
  },
  methods: {
    openModal() {
      this.toogleModal = true
    },
  },
}
</script>
