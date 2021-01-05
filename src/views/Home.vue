<template>
  <div class="home">

    <view-component file="Home.adoc" :useS3="false"></view-component>

  </div>
</template>

<script>
import ViewComponent from '../components/ViewComponent.vue'

export default {
  name: 'Home',
  components: {
    ViewComponent
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
