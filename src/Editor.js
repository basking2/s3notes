import { Link, useLocation } from "react-router-dom";
import EditorComponent from "./EditorComponent";
import SettingsContext from "./settings/SettingsContext";
import { useContext, useEffect, useRef, useState } from "react";
import StorageFactory from "./storage/StorageFactory"
import { Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Typography } from "@mui/material";
import aceThemes from "./EditorComponent/aceEditorThemes";
import DecryptionError from "./storage/DecryptionError";

function IsModified({setValueRef}) {
    const [ isModified, setIsModified ] = useState(false)

    if (setValueRef) {
        setValueRef.current = setIsModified
    }

    return <Chip value={isModified} aria-label="Is the document saved" label={isModified ? "Modified" : "Saved"}/>
}

export default function Editor(params={}) {

    const dialogStyles = {
        margin: "1em"
    }

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const file = searchParams.get('file')

    let defaultFileType = searchParams.get('type')
    if (!defaultFileType) {
        if (file.endsWith(".adoc") || file.endsWith(".asciidoc")) {
            defaultFileType = 'adoc'
        } else if (file.endsWith(".md") || file.endsWith(".markdown")) {
            defaultFileType = 'md'
        } else if (file.endsWith(".js") || file.endsWith(".json")) {
            defaultFileType = 'json'
        } else {
            defaultFileType = 'txt'
        }
    }

    // eslint-disable-next-line
    const [ settings, setSettings ] = useContext(SettingsContext)


    const storage = StorageFactory.fromSettings(settings)
    const [ fileText, setFileText ] = useState()
    const [ saving, setSaving ] = useState(false)
    const [ deleting, setDeleting ] = useState(false)
    const [ askDelete, setAskDelete ] = useState(false)
    const ref = useRef()
    const aceRef = useRef()
    const [ isEncrypted, setIsEncrypted ] = useState(true)
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
        } else if ( v === 'json') {
            setEditorMode('JSON')
        } else {
            setEditorMode('Text')
        }
    }

    const setValueRef = useRef()

    function handleSave(event, text) {
        event.stopPropagation()
        event.preventDefault()
        setSaving(true)

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
            } else {
                setValueRef.current(false)
            }
        })
    }

    function handleDelete(event) {
        setAskDelete(false)
        setDeleting(true)
        storage.delete(file ,(err) => {
            setDeleting(false)
            if (err) {
                console.error(err)
            }
            window.location = `${process.env.PUBLIC_URL}/index.html`
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
        if (event.target.type === 'textarea' && event.target.className === 'ace_text-input') {
            setValueRef.current(true)
        }
        // console.info("key up", event)
    }
    
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
                } else if (err instanceof DecryptionError) {
                    console.warn(`Failed to decrypt ${file}: ${err}`)
                    setFileText(`${err}`)
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
            <MenuItem value="json">JSON</MenuItem>
        </Select>)
    }

    /**
     * @returns File text to use in the editor on reloads.
     */
    const pickFileText = () => {
        if (aceRef && aceRef.current ) {
            const txt = aceRef.current.getValue()
            if (txt !== undefined && txt !== "") {
                return txt
            }
        }

        return fileText
    }

    return (<div ref={ref}>
        <Typography variant="h4" component="h1">
        Editing {file}
        </Typography>
        <Dialog style={dialogStyles} open={saving}>
            <DialogTitle>Saving {file}...</DialogTitle>
        </Dialog>
        <Dialog style={dialogStyles} open={deleting}>
            <DialogTitle>Deleting {file}...</DialogTitle>
        </Dialog>
        <Dialog style={dialogStyles} open={askDelete}>
            <DialogTitle>Delete File?</DialogTitle>
            <DialogContent>{file}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => setAskDelete(false)}>Cancel</Button>
                <Button onClick={handleDelete}>OK</Button>
            </DialogActions>
        </Dialog>
        Type: <AceModes />
        Theme: <AceThemes />
        Encrypt: <Checkbox checked={isEncrypted} onChange={e => {
            setIsEncrypted(e.target.checked)
        }} name="encrypt" label="Encrypt" aria-label="Encrypt"></Checkbox>

        <Link target="_new" to={`/view?file=${file}`}>View {file}</Link>

        <Button variant="outlined" style={{marginLeft:"1em"}} onClick={(event) => {
            handleSave(event, aceRef.current.getValue())
        } }>Save</Button>
        <Button variant="contained" style={{marginLeft:"1em"}} onClick={() => setAskDelete(true)}>Delete</Button>

        <IsModified setValueRef={setValueRef} />

        <EditorComponent content={pickFileText()} aceRef={aceRef} mode={editorMode} theme={editorTheme}/>

    </div>)
}