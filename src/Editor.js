import { useLocation } from "react-router-dom";
import EditorComponent from "./EditorComponent";
import SettingsContext from "./settings/SettingsContext";
import { lazy, Suspense, useContext, useDeferredValue, useEffect, useRef, useState } from "react";
import StorageFactory from "./storage/StorageFactory"

export default function Editor(params={}) {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const file = searchParams.get('file')
    const [ settings, setSettings ] = useContext(SettingsContext)
    const storage = StorageFactory.fromSettings(settings)

    const [ fileText, setFileText ] = useState()

    const ref = useRef()

    function keyDownListener(event) {
        console.info("key down", event)
    }
    function keyUpListener(event) {
        console.info("key up", event)
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
        storage.load(file, (err, txt) => {
            if (err) {
                if (txt) {
                    console.info("Got error and file data: ", err)
                    setFileText(txt)
                } else {
                    console.error(err)
                }
            } else {
                setFileText(txt)
            }
        })
    })

    return (<div ref={ref}>
    <EditorComponent content={fileText} onSave={fileText => {}} />
    </div>)
}