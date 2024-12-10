
import SettingsContext from "./settings/SettingsContext";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import StorageFactory from "./storage/StorageFactory"
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import AsciidocRenderView from "./renderviews/AsciidocRenderView";
import MarkdownRenderView from "./renderviews/MarkdownRenderView";
import JSONRenderView from "./renderviews/JSONRenderView";
import DecryptionError from "./storage/DecryptionError";

export default function Viewer(params={}) {

    const {
        // A file type used when the file is not found.
        fallbackFileType,

        // A file text used when the file is not found.
        fallbackFileText,

    } = params

    // A function that takes the file name requested and returns an array
    // with fallback file type and file text.
    let fallbackFunction
    if ('fallbackFunction' in params) {
        fallbackFunction = params.fallbackFunction
    } else {
        fallbackFunction = (file) => [fallbackFileType, fallbackFileText]
    }

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    let file
    if ('file' in params) {
        file = params.file
    } else {
        file = searchParams.get('file')
    }

    // eslint-disable-next-line
    const [ settings, setSettings ] = useContext(SettingsContext)

    const storage = StorageFactory.fromSettings(settings)
    const [ fileText, setFileText ] = useState()
    const ref = useRef()

    // eslint-disable-next-line
    const [ isEncrypted, setIsEncrypted ] = useState(true)
    const defaultFileType = 'loading'
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
        if (event.key === 'e') {
            window.location = `#/edit?file=${file}`
        }
    }
    
    useEffect(() => {
        const ele = window
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

    const loadFile = useCallback(() => {
        storage.load(file, true, (err, txt, meta) => {
            if (meta) {
                if (meta.not_found) {
                    let [ type, text ] = fallbackFunction(file)
                    if (!type || !text) {
                        setFileText(params.children)
                        setFileType('jsx')
                    } else {
                        setFileType(type)
                        setFileText(text)
                    }
                    return
                }
                if ('filetype' in meta) {
                    setFileType(meta.filetype)
                }

                if (meta.encrypt) {
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
                    setFileText(`# File ${file} cannot be decrypted.\n\n${err}`)
                    setFileType("md")
                } else {
                    console.error(err)
                }
            } else {
                setFileText(txt)
            }
        })
    // eslint-disable-next-line
    }, [ file ])


    useEffect(loadFile, [ file, loadFile ])

    function RenderFileWithTitle(params) {
        return <div>
        <Typography variant="h4" component="h1">
        Viewing {file}
        </Typography>

        {params.children}

        </div>
    }

    function RenderFile(params) {
        if (fileType === 'adoc') {
            return <AsciidocRenderView text={fileText}></AsciidocRenderView>
        } else if (fileType === 'md') {
            return <MarkdownRenderView text={fileText}></MarkdownRenderView>
        } else if (fileType === 'json') {
            return <RenderFileWithTitle>
                <JSONRenderView text={fileText}></JSONRenderView>
                </RenderFileWithTitle>
        } else if (fileType === 'jsx') {
            return fileText
        } else if (fileType === 'loading') {
            return <div>
                <h1 style={{color:"#a0a0a0", fontStyle: "italic"}}>Loading...</h1>
            </div>
        } else {
            return <RenderFileWithTitle>
                <pre>{fileText}</pre>
                </RenderFileWithTitle>
        }
    }


    return (<div ref={ref}>
        <RenderFile></RenderFile>
    </div>)
}