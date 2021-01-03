import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    s3config: undefined,
    docpass: undefined
  },
  getters: {
    s3config: (state) => {
      if (!state.s3config) {
        state.s3config = JSON.parse(window.localStorage.getItem('s3notes-s3config') || '{}')
      }

      return state.s3config
    },

    docpass: (state) => {
      if (!state.docpass) {
        state.docpass = window.localStorage.getItem('s3notes-docpass')
      }

      return state.docpass
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
    },
    docpass(state, pw) {
      state.docpass = pw
      state.docpass = window.localStorage.setItem('s3notes-docpass', pw)
    }
  },
  actions: {
  },
  modules: {
  }
})
