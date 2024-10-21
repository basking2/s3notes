

export default function JSONRenderView(params={}) {
    const { text } = params

    return <pre>{JSON.stringify(JSON.parse(text), 2, 2)}</pre>
}