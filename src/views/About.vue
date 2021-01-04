<template>
  <div class="about">
    <view-component :onRender="onRender" file="About.adoc" :useS3="false">
      About
    </view-component>
    <div v-if="noViewContent">
      Custom about.
    </div>
  </div>
</template>

<script>

import ViewComponent from '@/components/ViewComponent.vue'
export default {
  components: {
    ViewComponent
  },
  data() {
    return {
      noViewContent: true
    }
  },
  methods: {
    onRender(txt) {
      if (txt && txt.length > 0) {
        this.noViewContent = false
      } else {
        this.noViewContent = true
      }
    }
  }
}
</script>
