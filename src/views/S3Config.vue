<template>
    <div v-on:keyup.enter="updateAll()">
        <v-text-field v-model="s3config.accessKey" label="Access Key"></v-text-field>
        <v-text-field v-model="s3config.secretKey" label="Secret Key"></v-text-field>
        <v-text-field v-model="s3config.bucket" label="Bucket"></v-text-field>
        <v-text-field v-model="s3config.endpoint" label="Endpoint"></v-text-field>
        <v-btn v-on:click="updateAll()">Commit</v-btn>
        <v-btn v-on:click="clear()">Clear</v-btn>
    </div>
</template>

<script>
const utilEvent = require('../util/event')
export default {
    data() {
        return {
            s3config: {}
        }
    },
    mounted() {
        this.s3config = this.$store.getters.s3config
    },
    methods: {
        clear() {
            this.$store.commit('clears3config')
            this.s3config = {}
            utilEvent.dispatchAlert(this, 'success', "S3 configuration cleared.")
        },
        updateAll() {
            this.$store.commit('s3config', this.s3config)
            utilEvent.dispatchAlert(this, 'success', "S3 configuration stored.")
        }
    }
}
</script>

<style scoped>

</style>