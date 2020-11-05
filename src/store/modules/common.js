const state = {
  menu_list: [],
  sidebar_fold: true
}
const mutations = {
  SET_MENU_LIST (state, val) {
    state.menu_list = val
  },
  SET_SIDEBAR_FOLD (state, val) {
    state.sidebar_fold = val
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
