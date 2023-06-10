export const state = () => ({
  sidebar: false,
})

export const getters = {}

export const mutations = {
  setSidebar(state, payload) {
    state.sidebar = payload
  },
}

export const actions = {
  toggleSidebar({ commit, state }) {
    // make request
    commit('setSidebar', !state.sidebar)
  },
}
