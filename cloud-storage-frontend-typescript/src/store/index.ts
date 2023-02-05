import { createStore } from 'vuex'
import auth from "./modules/auth.module"
import files from "./modules/files.module"

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    files
  }
})
