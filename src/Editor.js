import { useLocation } from "react-router-dom";
import EditorComponent from "./EditorComponent";
import SettingsContext from "./settings/SettingsContext";
import { useContext, useDeferredValue, useState } from "react";
import StorageFactory from "./storage/StorageFactory"

export default function Editor(params={}) {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const file = searchParams.get('file')
    const [ settings, setSettings ] = useContext(SettingsContext)
    const storage = StorageFactory.fromSettings(settings)

    const [ fileText, setFileText ] = useState("")
    const deferredFileText = useDeferredValue(fileText)

    storage.load(file, (err, txt) => {
        if (err) {
            console.error(err)
        } else {
            setFileText(txt)
        }
    })

    return (<>
    <EditorComponent></EditorComponent>
    {file}
    {deferredFileText}
    <pre>{JSON.stringify(params, 2,2)}</pre>
    </>)
}