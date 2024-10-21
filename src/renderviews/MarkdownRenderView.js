import { marked } from 'marked'

export default function MarkdownRenderView(params={}) {
    const { text } = params

    const html = marked.parse(text)

    return <div dangerouslySetInnerHTML={{__html: html}}></div>
}