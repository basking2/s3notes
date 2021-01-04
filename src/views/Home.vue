<template>
  <div class="home">

    <v-card class="d-flex flex-column">
    <router-link to="/view/note.html">note.html</router-link>
    <router-link to="/view/note.adoc">note.adoc</router-link>
    <router-link to="/view/note.md">note.md</router-link>
    <router-link to="/view/note.txt">note.txt</router-link>
    </v-card>

    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
}
</script>
