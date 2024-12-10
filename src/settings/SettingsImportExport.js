import { Button, Input, Link } from "@mui/material";
import { s3NotesConfig } from "./SettingsStorageComponent";
import { useContext, useRef } from "react";
import SettingsContext from "./SettingsContext";

export default function SettingsComponent(props = {}) {

    const [settings] = useContext(SettingsContext)

    const fileRef = useRef()

    return (<>
    <h2>Export</h2>
    <Link href=""
        variant="overline"
        onClick={(event) => {

            let obj
            if (s3NotesConfig in localStorage) {
                obj = localStorage.getItem(s3NotesConfig)
            } else {
                obj = {}
            }

            event.target.href = "data:text/json;charset=utf-8," + encodeURIComponent(obj);
            event.target.download = "config.txt";
            return false

        }}>Download Stored Config</Link> - You probabaly don't want this option

    <br />

    <Link href=""
        variant="overline"
        onClick={(event) => {
            event.target.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, 2, 2));
            event.target.download = "config.json";
            return false
        }}>Download Config JSON</Link>

    <h2>Import</h2>

    <form
        onSubmit={(event) => {
            for (const f of event.target[0].files) {
                const reader = new FileReader()
                reader.readAsText(f, 'UTF-8')
                //const fileName = f.name

                reader.onload = (event) => {
                    localStorage.setItem(s3NotesConfig, event.target.result)
                    window.location.reload()
                }
        
                reader.onerror = (event) => {
                    console.error(event)
                }
            }
    }}>

        <Input type="file" inputRef={fileRef}></Input> <br />
        <Button type="submit" aria-label="Upload file" name="upload-file" label="Upload File">Upload Config</Button>
    </form>
    </>)
}