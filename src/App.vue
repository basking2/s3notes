<template>
  <v-app id="app">

    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-navigation-drawer v-model="drawer" app>
      <v-list nav dense>
        <v-list-item>
          <router-link to="/">Home</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/editor/note.html">Editor</router-link>
        </v-list-item>
        <v-list-item>
          <router-link :to="{name: 'DocPass'}">Doc Pass</router-link>
        </v-list-item>
        <v-list-item>
          <router-link :to="{name: 'S3Config'}">S3 Config</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/about">About</router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-alert :type="alertType" dismissible :value="!!alertMessage">{{alertMessage}}</v-alert>

      <v-container fluid
        v-on:auth-error.prevent="onAuthError($event)"
        v-on:alert-message.prevent="onAlertMessage($event)"
        >
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      alertMessage: undefined,
      alertType: 'error',
      drawer: undefined
    }
  },
  methods: {
    onAuthError() {
      this.$router.push({name: "Login", query: {redirect: window.location.href }})
      this.alertMessage = `Failed to authenticate at ${this.$store.getters.credentials.user}`
    },
    onAlertMessage(event) {
      this.alertMessage = event.message
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
