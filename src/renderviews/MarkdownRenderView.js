
export default function MarkdownRenderView(params={}) {
    const { text } = params

    const html = <pre>{text}</pre>

    return <div dangerouslySetInnerHTML={{__html: html}}></div>
}