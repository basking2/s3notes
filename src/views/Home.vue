<template>
  <div class="home">

    <view-component file="Home.adoc" :useS3="false"></view-component>

    <v-card flat class="d-flex flex-column">
      <v-card flat class="d-flex flex-row">
        <v-text-field v-on:keyup.enter="$router.push(`/editor/${newFile}`)" v-model="newFile" label="New file."></v-text-field>
        <v-btn @click="$router.push(`/editor/${newFile}`)">Edit</v-btn>
        <v-btn @click="$router.push(`/view/${newFile}`)">View</v-btn>
      </v-card>

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
import ViewComponent from '../components/ViewComponent.vue'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    ViewComponent
    // HelloWorld
  },
  data() {
    return {
      newFile: undefined
    }
  },
  methods: {
  }
}
</script>
