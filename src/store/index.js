import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    s3config: {
      accessKey: undefined,
      secretKey: undefined,
      endpoint: undefined,
      bucket: undefined
    }
  },
  getters: {
    s3config: (state) => {
      var o = {}
      if (state.s3config.secretKey && state.s3config.accessKey) {
        o = state.s3config
      }

      o = JSON.parse(window.localStorage.getItem('s3notes-s3config') || '{}')

      return o
    }
  },
  mutations: {
    s3config(state, config) {
      var accessKey = config.accessKey
      var secretKey = config.secretKey
      var endpoint = config.endpoint
      var bucket = config.bucket
      var o

      try {
        o = JSON.parse(window.localStorage.getItem('s3notes-s3config'))
      } catch {
        o = {}
      }

      if (!o) {
        o = {}
      }

      if (accessKey) {
        o.accessKey = state.s3config.accessKey = accessKey
      }

      if (secretKey) {
        o.secretKey = state.s3config.secretKey = secretKey
      }

      if (bucket) {
        o.bucket = state.s3config.bucket = bucket
      }

      if (endpoint) {
        o.endpoint = state.s3config.endpoint = endpoint
      }

      window.localStorage.setItem('s3notes-s3config', JSON.stringify(o))
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
