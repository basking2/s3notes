import ace from "ace-builds/src-noconflict/ace"
import { useEffect, useRef, useState } from "react";
import aceModes from "./aceEditorModes";
import aceThemes from './aceEditorThemes'

const defaultTheme = 'Cloud9 Day'
const defaultMode = 'Asciidoc'

export default function EditorComponent(params={}) {
    const {content, onSave} = params

    let editor = null
    useEffect(() => {
        editor = ace.edit("ace-editor");
        editor.setTheme(aceThemes[defaultTheme])
        editor.session.setMode(new aceModes[defaultMode]())
    })

    const ref = useRef()
    const editorRef = useRef()

    function resizeEditor() {
        const bodyRect = document.body.getBoundingClientRect()
        const divRect = ref.current.getBoundingClientRect()
        const w = bodyRect.width - divRect.left //- (bodyRect.right - divRect.right)
        const h = bodyRect.height - divRect.top //- (bodyRect.bottom - divRect.bottom)
        editorRef.current.style.width = `${w}px`
        editorRef.current.style.height = `${h}px`
        editor.resize()
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
    <pre>{content}</pre>
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