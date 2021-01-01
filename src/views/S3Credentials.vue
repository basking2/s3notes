<template>
    <div v-on:keyup.enter="updateAll()">
        <v-text-field v-model="accessKey" label="Access Key"></v-text-field>
        <v-text-field v-model="secretKey" label="Secret Key"></v-text-field>
        <v-text-field v-model="bucket" label="Bucket"></v-text-field>
        <v-text-field v-model="endpoint" label="Endpoint"></v-text-field>
        <v-btn v-on:click="updateAll()">Commit</v-btn>
        <v-btn v-on:click="clear()">Clear</v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            accessKey: undefined,
            secretKey: undefined,
            endpoint: undefined,
            bucket: undefined,
        }
    },
    mounted() {
        var c = this.$store.getters.s3config
        this.accessKey = c.accessKey
        this.secretKey = c.secretKey
        this.endpoint = c.endpoint
        this.bucket = c.bucket
    },
    methods: {
        clear() {
            this.accessKey = undefined
            this.secretKey = undefined
            this.endpoint = undefined
            this.bucket = undefined
            this.$store.commit('clears3config')
        },
        updateAll() {
            this.$store.commit(
                's3config', 
                {
                    accessKey: this.accessKey,
                    secretKey: this.secretKey,
                    bucket: this.bucket,
                    endpoint: this.endpoint
            })
        }
    }
}
</script>

<style scoped>

</style>