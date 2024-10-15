import { useLocation } from "react-router-dom";
import EditorComponent from "./EditorComponent";
import SettingsContext from "./settings/SettingsContext";
import { useContext, useEffect, useRef, useState } from "react";
import StorageFactory from "./storage/StorageFactory"
import { Checkbox, Dialog, MenuItem, Select } from "@mui/material";
import storagepack from "./storage/storagepack"

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
    const encryptRef = useRef()
    const aceRef = useRef()
    const [ isEncrypted, setIsEncrypted ] = useState(true)
    const defaultFileType = 'txt'
    const fileTypeRef = useRef(defaultFileType)

    function handleSave(event, text) {
        event.stopPropagation()
        event.preventDefault()
        setSaving(true)

        console.info(defaultFileType)
        console.info(fileTypeRef.current.value)

        //text = storagepack.pack({ type: fileType.current }, text)

        let fileType = fileTypeRef.current.value
        storage.store({
            key: file,
            meta: {
                filetype: fileTypeRef.current.value
            },
            text,
            noencrypt: !encryptRef.current.checked
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
        storage.load(file, true, (err, txt, meta) => {
            console.info("Got error and file data: ", err, txt, meta)
            if (err) {
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
    })

    return (<div ref={ref}>
        <Dialog open={saving}>
            <h1><em>Saving...</em></h1>
        </Dialog>
        <Select 
            defaultValue={defaultFileType}
            label="File Type"
            aria-label="File Type"
            inputRef={fileTypeRef}
        >
            <MenuItem value="txt">Text</MenuItem>
            <MenuItem value="adoc">AsciiDoc</MenuItem>
            <MenuItem value="md">Markdown</MenuItem>
        </Select>
        Encrypt: <Checkbox checked={isEncrypted} onChange={e => {
            setIsEncrypted(e.target.checked)
        }} inputRef={encryptRef} name="encrypt" label="Encrypt" aria-label="Encrypt"></Checkbox>
        <EditorComponent content={fileText} aceRef={aceRef} />
    </div>)
}