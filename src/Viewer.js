
import SettingsContext from "./settings/SettingsContext";
import { useContext, useEffect, useRef, useState } from "react";
import StorageFactory from "./storage/StorageFactory"
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function Viewer(params={}) {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const file = searchParams.get('file')

    // eslint-disable-next-line
    const [ settings, setSettings ] = useContext(SettingsContext)

    const storage = StorageFactory.fromSettings(settings)
    const [ fileText, setFileText ] = useState()
    const ref = useRef()
    const [ isEncrypted, setIsEncrypted ] = useState(true)
    const defaultFileType = 'txt'
    const [ fileType, _setFileType ] = useState(defaultFileType)

    function setFileType(v) {
        _setFileType(v)

        if (v === 'adoc') {
        } else if (v === 'md') {
        } else {
        }
    }

    function keyDownListener(event) {
        if (event.key==='s') {
            if (event.ctrlKey || event.metaKey) {
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
        const prevTitle = document.title

        document.title = `Viewing ${file}`

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

    return (<div ref={ref}>
        <Typography variant="h4" component="h1">
        Viewing {file}
        </Typography>
        <pre>
        {fileText}
        </pre>
    </div>)
}