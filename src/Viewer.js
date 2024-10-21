
import SettingsContext from "./settings/SettingsContext";
import { useContext, useEffect, useRef, useState } from "react";
import StorageFactory from "./storage/StorageFactory"
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import AsciidocRenderView from "./renderviews/AsciidocRenderView";
import { render } from "@testing-library/react";
import MarkdownRenderView from "./renderviews/MarkdownRenderView";

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

    function RenderFile(params) {
        if (fileType === 'adoc') {
            return <AsciidocRenderView text={fileText}></AsciidocRenderView>
        } else if (fileType === 'md') {
            return <MarkdownRenderView text={fileText}></MarkdownRenderView>
        } else {
            return <pre>fileText</pre>
        }
    }

    return (<div ref={ref}>
        <Typography variant="h4" component="h1">
        Viewing {file}
        </Typography>

        <RenderFile></RenderFile>
    </div>)
}