<template>
    <div>
        <view-component :file="myfile" :useS3="!!useS3" :key="myfile" />
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
            myfile: this.file
        }
    },
    mounted() {
    },
    methods: {
    },
    beforeRouteUpdate(to, from, next) {
        if (to.name == from.name) {
            this.myfile = to.params.file
            next()
        }
    }
}
</script>