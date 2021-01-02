import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    s3config: undefined
  },
  getters: {
    s3config: (state) => {
      if (!state.s3config) {
        state.s3config = JSON.parse(window.localStorage.getItem('s3notes-s3config') || '{}')
      }

      return state.s3config
    }
  },
  mutations: {
    s3config(state, config) {
      state.s3config = config
      window.localStorage.setItem('s3notes-s3config', JSON.stringify(config))
    },
    clears3config(state) {
      state.s3config = {}
      window.localStorage.setItem('s3notes-s3config', JSON.stringify({}))
    }
  },
  actions: {
  },
  modules: {
  }
})
