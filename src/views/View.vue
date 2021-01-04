<template>
    <div>
        <view-component :file="file" :useS3="!!useS3" />
    </div>
</template>

<script>
import ViewComponent from '../components/ViewComponent.vue'

export default {
    components: {
      ViewComponent 
    },
    props: {
        file: String,
        useS3: Boolean,
    },
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
    }
}
</script>