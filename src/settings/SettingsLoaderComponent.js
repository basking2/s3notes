/**
 * A component that will load the configuration settings
 * and can prompt for a password if one is required.
 * 
 * This will use some functions from SeettingsStorer to do this work.
 */

import { useEffect, useRef, useContext, useState } from "react"
import { needPasswordEventType } from "./SettingsEvent"
import SettingsContext from "./SettingsContext"

const { TextField, Dialog, Button } = require("@mui/material")

export default (props={}) => {

    const [settings, setSettings] = useContext(SettingsContext)

    const [prompt, setPrompt] = useState(!!settings.ciphertext)

    const handelEvent = (event) => {
        setPrompt(true)
    }

    const ref = useRef()

    // Manage event handling.
    useEffect(() => {
        const elem = ref.current
        elem.addEventListener(needPasswordEventType, handelEvent)
        return () => elem.removeEventListener(needPasswordEventType, handelEvent)
    })

    return <div ref={ref}>

        <Dialog open={prompt}>
            <div style={{margin:'1em'}}>
                <h1>Config Password</h1>
                <div>
                   <TextField variant="standard" label="Config Password" aria-label="Config Password" name="config-password" type="password" />
                </div>
                <div>
                    <Button style={{display: "inline"}} variant="contained">Set Password</Button>
                    <Button style={{display: "inline"}} variant="outlined" onClick={() => setPrompt(false)}>Cancel</Button>
                </div>
            </div>
        </Dialog>

        {/* Settings Loader <br />
        <TextField variant="standard" type="password" aria-label="Config Password" label="Config Password" name="config-password"></TextField> */}

        {props.children}

    </div>
}