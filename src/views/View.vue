<template>
    <div v-on:click.prevent="handleClicks($event)">


        <div v-if="html" v-html="html"></div>
        <code v-if="rawText">{{rawText}}</code>
        <div v-if="adoc" v-html="adoc"></div>
        <div v-if="markdown" v-html="markdown"></div>


        <v-footer absolute>
            <router-link :to="`/editor/${file}`">Edit {{file}}</router-link>
        </v-footer>
    </div>
</template>

<script>
const http = require('http')
const encryption = require('../encryption')
const utilEvent = require('../util/event')
const asciidoctor = require('asciidoctor')()
const marked = require('marked')

export default {
    props: {
        file: String,
        useS3: Boolean,
    },
    data() {
        return {
            html: undefined,
            adoc: undefined,
            markdown: undefined,
            rawText: undefined,
        }
    },
    mounted() {
        this.getDoc()
    },
    methods: {
        clearContent() {
            this.html = undefined
            this.adoc = undefined
            this.markdown = undefined
            this.rawText = undefined
        },
        defaultRender(txt) {
            this.clearContent()
            this.rawText = txt
        },
        renderHtml(html) {
            this.clearContent()
            this.html = html
        },
        renderAsciiDoc(adoc) {
            const adocOpts = { 'safe': 'server', 'attributes': { 'showtitle': true, 'icons': 'font' } }
            const html = asciidoctor.convert(adoc, adocOpts)
            this.clearContent()
            this.adoc = html
        },
        renderMarkdown(md) {
            this.clearContent()
            this.markdown = marked(md)
        },
        getDoc() {
            var endpoint = this.$store.getters.s3config.endpoint
            var bucket = this.$store.getters.s3config.bucket
            var url = new URL(`${endpoint}/${bucket}/data/${this.file}`)

            var req = http.request(
                {
                   method: 'GET',
                   protocol: url.protocol,
                   host: url.hostname,
                   port: url.port,
                   path: url.pathname,
                },
                res => {

                    var handler = this.defaultRender
                    if (!res.headers['content-type']) {
                        handler = this.defaultRender
                    } else if (res.headers['content-type'].toLowerCase().startsWith('text/html')) {
                        handler = this.renderHtml
                    } else if (this.file.toLowerCase().endsWith('.adoc') || this.file.toLowerCase().endsWith('.asciidoc')) {
                        handler = this.renderAsciiDoc
                    } else if (this.file.toLowerCase().endsWith('.md')) {
                        handler = this.renderMarkdown
                    } else {
                        handler = this.defaultRender
                    }

                    var data = ''
                    res.on('data', chunk => data += chunk)
                    res.on('end', () => {
                        var cipher = res.headers['x-amz-meta-cipher']
                        if (cipher) {
                            var salt = res.headers['x-amz-meta-salt']
                            var iv1 = res.headers['x-amz-meta-iv1']
                            var iv2 = res.headers['x-amz-meta-iv2']
                            var key = res.headers['x-amz-meta-key']
                            var pass = this.$store.getters.docpass
                            encryption.decrypt(pass, salt, iv1, iv2, key, data, (err, data) => {
                                if (err) {
                                    utilEvent.dispatchAlert(this, err.message)
                                } else {
                                    handler(data)
                                }
                            })
                        } else {
                            handler(data)
                        }
                    })
                    res.on('error', (err) => utilEvent.dispatchAlert(this, err.message))
            })

            req.end()
        },
        handleClicks(event){
            if (event.target && event.target.href) {
                var url = new URL(event.target.href)
                if (window.location.pathname == url.pathname) {

                    var eles = document.getElementsByTagName('a')
                    for (var i = 0; i < eles.length; ++i) {
                        var url2 = new URL(eles[i].href)
                        if (url2.hash == url.hash) {
                            eles[i].scrollTo()
                        }
                    }
                    return
                }

                if (window.location.host == url.host) {
                    this.$router.push(`/view${url.pathname}`)
                    window.location.reload(true)                    
                    return
                }
            }
        }
    }
}
</script>