import { Link, useLocation } from "react-router-dom";
import EditorComponent from "./EditorComponent";
import SettingsContext from "./settings/SettingsContext";
import { useContext, useEffect, useRef, useState } from "react";
import StorageFactory from "./storage/StorageFactory"
import { Checkbox, Dialog, MenuItem, Select, Typography } from "@mui/material";
import aceThemes from "./EditorComponent/aceEditorThemes";

export default function Editor(params={}) {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const file = searchParams.get('file')

    // eslint-disable-next-line
    const [ settings, setSettings ] = useContext(SettingsContext)

    const storage = StorageFactory.fromSettings(settings)
    const [ fileText, setFileText ] = useState()
    const [ saving, setSaving ] = useState(false)
    const ref = useRef()
    const aceRef = useRef()
    const [ isEncrypted, setIsEncrypted ] = useState(true)
    const defaultFileType = 'txt'
    const [ fileType, _setFileType ] = useState(defaultFileType)
    const [ editorMode, setEditorMode ] = useState('Text')
    const defaultEditorTheme = 'Cloud9 Day'
    const [ editorTheme, setEditorTheme ] = useState(defaultEditorTheme)

    function setFileType(v) {
        _setFileType(v)

        if (v === 'adoc') {
            setEditorMode('Asciidoc')
        } else if (v === 'md') {
            setEditorMode('Markdown')
        } else {
            setEditorMode('Text')
        }
    }

    function handleSave(event, text) {
        event.stopPropagation()
        event.preventDefault()
        setSaving(true)

        //text = storagepack.pack({ type: fileType.current }, text)

        storage.store({
            key: file,
            meta: {
                filetype: fileType,
                encrypt: isEncrypted,
            },
            text,
            noencrypt: !isEncrypted,
        }, (err) => {
            setSaving(false)
            if (err) {
                console.error(err)
            }
        })
    }

    function keyDownListener(event) {
        //console.info("key down", event)
        if (event.key==='s') {
            if (event.ctrlKey || event.metaKey) {
                handleSave(event, aceRef.current.getValue())
            }
        }
    }

    function keyUpListener(event) {
        //console.info("key up", event)
    }
    
    // On unload, cache the file text from the editor.
    // This is to prevent changes to child components from causing the 
    // editor to be re-freshed with old text.
    useEffect(() => {
        let ar = aceRef
        return () => {
            let t = ar.current.getValue()
            if (t !== fileText) {
                setFileText(ar.current.getValue())
            }
        }
    })

    useEffect(() => {
        const ele = ref.current
        ele.addEventListener('keydown', keyDownListener)
        ele.addEventListener('keyup', keyUpListener)

        return () => {
            ele.removeEventListener('keydown', keyDownListener)
            ele.removeEventListener('keyup', keyUpListener)
        }
    })

    useEffect(() => {
        const prevTitle = document.title

        document.title = `Editing ${file}`

        return () => { document.title = prevTitle }
    })

    useEffect(() => {
        storage.load(file, true, (err, txt, meta) => {


            if (meta) {
                if ('filetype' in meta) {
                    setFileType(meta.filetype)
                }

                if ('encrypt' in meta) {
                    setIsEncrypted(meta.encrypt)
                }
            } else {
                console.error("Meta information for doocument was not given.")
            }

            if (err) {
                console.error(err)
                if (txt) {
                    setFileText(txt)
                    setIsEncrypted(false)
                } else {
                    console.error(err)
                }
            } else {
                setFileText(txt)
            }
        })

    // eslint-disable-next-line
    }, [ /* Intentionally no dependencies. */ ])

    function AceThemes() {
        let themes = Object.keys(aceThemes).map(k => <MenuItem key={k} value={k}>{k}</MenuItem>)

        return (<Select 
            value={editorTheme}
            label="Editor Theme"
            aria-label="Editor Theme"
            variant="standard"
            onChange={e => setEditorTheme(e.target.value)}
        >
            {themes}
        </Select>
        )
    }

    function AceModes() {
        return (<Select 
            value={fileType}
            label="File Type"
            aria-label="File Type"
            variant="standard"
            onChange={e => setFileType(e.target.value)}
        >
            <MenuItem value="txt">Text</MenuItem>
            <MenuItem value="adoc">AsciiDoc</MenuItem>
            <MenuItem value="md">Markdown</MenuItem>
        </Select>)
    }

    return (<div ref={ref}>
        <Typography variant="h4" component="h1">
        Editing {file}
        </Typography>
        <Dialog open={saving}>
            <h1><em>Saving...</em></h1>
        </Dialog>
        Type: <AceModes />
        Theme: <AceThemes />
        Encrypt: <Checkbox checked={isEncrypted} onChange={e => {
            setIsEncrypted(e.target.checked)
        }} name="encrypt" label="Encrypt" aria-label="Encrypt"></Checkbox>

        <Link target="_new" to={`/view?file=${file}`}>View {file}</Link>

        <EditorComponent content={fileText} aceRef={aceRef} mode={editorMode} theme={editorTheme}/>

    </div>)
}