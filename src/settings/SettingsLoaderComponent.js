/**
 * A component that will load the configuration settings
 * and can prompt for a password if one is required.
 * 
 * This will use some functions from SeettingsStorer to do this work.
 */

import { useEffect, useRef, useContext } from "react"
import { needPasswordEventType } from "./SettingsEvent"
import SettingsContext from "./SettingsContext"

const { TextField } = require("@mui/material")

export default (props={}) => {

    const settingsContext = useContext(SettingsContext)

    const handelEvent = (event) => {
        console.debug("Handling loading password.")
        console.info(event)
    }

    const ref = useRef()

    // Manage event handling.
    useEffect(() => {
        const elem = ref.current
        elem.addEventListener(needPasswordEventType, handelEvent)
        return () => elem.removeEventListener(needPasswordEventType, handelEvent)
    })

    return <div ref={ref}>
        {/* Settings Loader <br />
        <TextField variant="standard" type="password" aria-label="Config Password" label="Config Password" name="config-password"></TextField> */}

        {props.children}
    </div>
}