import Asciidoctor from "@asciidoctor/core"

export default function AsciidocRenderView(params={}) {
    const { text } = params

    const asciidoctor = Asciidoctor()
    const html = asciidoctor.convert(text, { standalone: true })

    return <div dangerouslySetInnerHTML={{__html: html}}></div>
}