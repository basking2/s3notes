import { useLocation } from "react-router-dom";
import EditorComponent from "./EditorComponent";
import SettingsContext from "./settings/SettingsContext";
import { useContext } from "react";
import StorageFactory from "./storage/StorageFactory"

export default function Editor(params={}) {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const file = searchParams.get('file')
    const [ settings, setSettings ] = useContext(SettingsContext)
    const storage = StorageFactory.fromSettings(settings)

    return (<>
    <EditorComponent></EditorComponent>
    {file}
    <pre>{JSON.stringify(params, 2,2)}</pre>
    </>)
}