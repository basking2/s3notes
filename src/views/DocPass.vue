<template>
    <div>
        Set the default document password.
        <v-form v-on:keyup.enter="setCredentials()">
            <v-text-field type="password" :error="errors.length > 0" :error-messages="errors" :change="passMatch()" v-model="docpass" label="Password"></v-text-field>
            <v-text-field type="password" :error="errors.length > 0" :error-messages="errors" :change="passMatch()" v-model="docpass_confirm" label="Password Confirm"></v-text-field>
            <v-btn @click="setCredentials()">Set Credentials</v-btn>
        </v-form>

    </div>
</template>

<script>

import utilEvent from '@/util/event'

export default {
    data() {
        return {
            docpass: undefined,
            docpass_confirm: undefined,
            errors: []
        }
    },
    mounted() {
        this.docpass = this.$store.getters.docpass
        this.docpass_confirm = this.$store.getters.docpass
    },
    methods: {
        passMatch() {
            // Q - Why is this logic so convoluted?
            // A - It breaks infinite updates to the two components that both use this to find errors.
            if (this.docpass != this.docpass_confirm && this.errors.length == 0) {
                this.errors = [ "Passwords do not match."]
            } else if (this.docpass == this.docpass_confirm && this.errors.length > 0) {
                this.errors = []
            }
        },
        setCredentials() {
            if (this.errors.length > 0) {
                utilEvent.dispatchAlert(this, "Not storing credentials. Passwords do not match.")
            }
            else if (!this.docpass || this.docpass.length == 0) {
                utilEvent.dispatchAlert(this, "Not storing credentials of 0 length.")
            }
            else {
                this.$store.commit('docpass', this.docpass)
            }
        }
    }
}
</script>