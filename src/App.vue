<template>
  <v-app id="app">


    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

    <v-navigation-drawer v-model="drawer" app>
  
      <v-card flat class="row ml-4 mt-1">
        <v-card flat class="mt-auto mb-auto">S3 Notes</v-card>
        <v-img src="logo.png" max-width="64px" class="ml-auto mr-auto"></v-img>
      </v-card>
  
      <v-list nav dense>
        <v-list-item>
          <router-link to="/">
            <v-card flat class="mt-auto mb-auto">Home</v-card>
          </router-link>
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

        <v-list-item>
          <v-card flat class="d-flex flex-column">
            <v-card flat class="d-flex flex-row">
              <v-text-field v-on:keyup.enter="$router.push(`/editor/${newFile}`)" v-model="newFile" label="New file."></v-text-field>
            </v-card>
            <v-card flat class="d-flex flex-row">
              <v-btn @click="$router.push(`/editor/${newFile}`)">Edit</v-btn>
              <v-btn @click="$router.push(`/view/${newFile}`)">View</v-btn>
            </v-card>
          </v-card>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      
      <v-alert :type="alertType" dismissible v-model="alert">{{alertMessage}}</v-alert>

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
      alert: false,
      alertMessage: undefined,
      alertType: 'error',
      drawer: undefined,
      newFile: undefined
    }
  },
  methods: {
    onAuthError() {
      this.$router.push({name: "Login", query: {redirect: window.location.href }})
      this.alertMessage = `Failed to authenticate at ${this.$store.getters.credentials.user}`
    },
    onAlertMessage(event) {
      this.alertMessage = event.message
      this.alertType = event.alertType
      this.alert = true
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
