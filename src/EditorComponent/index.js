// Get the editor.
import ace from "ace-builds/src-noconflict/ace"

// Include this so the search dialogue is bundled in the app.
// Otherwise, ^-F throws an error.
// eslint-disable-next-line
import aceSearch from "ace-builds/src-noconflict/ext-searchbox"

// Code syntax highlighting, etc.
import aceModes from "./aceEditorModes";

// Pretty themes.
import aceThemes from './aceEditorThemes'

import { useEffect, useRef } from "react";

const defaultTheme = 'Cloud9 Day'
const defaultMode = 'Asciidoc'

export default function EditorComponent(params={}) {
    const {
        // Initial text content.
        content,

        // How the parent element can touch the Ace Editor instance.
        aceRef
    } = params

    const theme = params.theme || defaultTheme
    const mode = params.mode || defaultMode

    useEffect(() => {
        if (mode in aceModes) {
            const editor = ace.edit("ace-editor");
            editor.setTheme(aceThemes[theme])
            editor.session.setMode(new aceModes[mode]())
            editor.setValue(content)
            editor.clearSelection()

            if (aceRef) {
                aceRef.current = editor
            }
        }
    })

    const ref = useRef()
    const editorRef = useRef()

    function resizeEditor() {
        const bodyRect = document.body.getBoundingClientRect()
        const divRect = ref.current.getBoundingClientRect()
        const w = bodyRect.width - divRect.left //- (bodyRect.right - divRect.right)
        let h = window.innerHeight - divRect.top //- (bodyRect.bottom - divRect.bottom)
        if (h < 100) {
            h = 100
        }
        editorRef.current.style.width = `${w}px`
        editorRef.current.style.height = `${h}px`
        aceRef.current.resize()
    }

    useEffect(() => {
        resizeEditor()
    })

    useEffect(() => {
        window.addEventListener('resize', resizeEditor)
        return () => {
            window.removeEventListener('resize', resizeEditor)
        }
    })

    return (<div 
        ref={ref}
        style={{}}
        >
    <div
        onLoad={resizeEditor}
        id="ace-editor"
        ref={editorRef}
        style={{
            position: 'absolute',
        }}
    ></div>
    </div>)
}