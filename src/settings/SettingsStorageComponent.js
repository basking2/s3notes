/**
 * A component that will load the configuration settings
 * and can prompt for a password if one is required.
 * 
 * This will use some functions from SeettingsStorer to do this work.
 */

import { useEffect, useRef, useContext, useState } from "react"
import { needPasswordEventType } from "./SettingsEvent"
import SettingsContext from "./SettingsContext"
import SettingsDefaults from "./SettingsDefaults"
import { DocCrypt } from "@basking2/docryptjs"

const { TextField, Dialog, Button } = require("@mui/material")
const docCrypt = DocCrypt.aes256cbc()

export const s3NotesConfig = "s3NotesConfig"

export const storeSettingsEventType = "storeSettingsEventType"
export function dispatchStoreSettings(elem, settings) {
    const event = new CustomEvent(storeSettingsEventType, { bubbles: true, detail: {settings}})

    if (!settings) {
        throw new Error("need settings")
    }

    return elem.dispatchEvent(event)
}

function storeSettings(password, settings, callback) {
    let stateStr = JSON.stringify(settings)
    if (password) {
        const salt = DocCrypt.salt(32)
        docCrypt.encryptString(password, salt, stateStr).then(stateStr => {
            // We choose to store our password salt.
            stateStr['salt'] = salt
            stateStr = JSON.stringify(stateStr)
            localStorage.setItem(s3NotesConfig, stateStr)
            callback(null)
        }).catch(e => {
            callback(e)
        })
    } else {
        localStorage.setItem(s3NotesConfig, stateStr)
        callback(null)
    }
}

function emptySettings() {
    return {settings: SettingsDefaults}
}

function loadSettings(password, callback) {
    let config = ''

    if (s3NotesConfig in localStorage) {
        config = JSON.parse(localStorage.getItem(s3NotesConfig))

        if ('ciphertext' in config) {
            if (password) {
                try {
                    docCrypt.decryptString({...config, password})
                        .then(val =>{
                            val = JSON.parse(val)
                            callback(null, val)
                            return val
                        })
                        .catch(callback)
                } catch (e) {
                    callback(e, null)
                }
            } else {
                callback(new Error("no password"), null)
            }

        } else {
            callback(null, config)
        }
    } else {
        callback(null, emptySettings())
    }
}

export default function SettingsStorageComponent(props={}) {

    const [settings, setSettings] = useContext(SettingsContext)

    const [password, setPassword] = useState()

    const [prompt, setPrompt] = useState(!! settings && !!settings.ciphertext)

    const handelEvent = (event) => {
        setPrompt("set-store-password")
    }

    const ref = useRef()

    // Manage event handling.
    useEffect(() => {
        const elem = ref.current
        elem.addEventListener(needPasswordEventType, handelEvent)
        return () => elem.removeEventListener(needPasswordEventType, handelEvent)
    })

    // Manage event handling.
    useEffect(() => {
        const elem = ref.current

        const handler = (evnt) => {
            if (!evnt.detail.settings) {
                throw new Error(`Settings is required in ${storeSettingsEventType} event.`)
            }

            saveSettings(password, evnt.detail.settings)
        }

        elem.addEventListener(storeSettingsEventType, handler)
        return () => elem.removeEventListener(storeSettingsEventType, handler)
    })

    // This effect will load the configurations, optionally prompting for a password.
    useEffect(() => {

        if (settings) {
            return
        }

        loadSettings(password, (err, val) => {
            if (err) { 
                if (err.message === "no password") { 
                    setPrompt("set-load-password")
                } else {
                    console.error(err)
                }
            } else {
                setSettings(val)
            }
        })
    })

    const passwordField1Ref = useRef()
    const passwordField2Ref = useRef()
    const passwordFieldRef = useRef()

    // Store and set settings with the given password.
    function saveSettings(password, settings) {
        storeSettings(password, settings, (err, settings) => {
            if (err) {
                console.error(err)
            } else {
                setSettings(settings)
            }
            setPrompt(false)
    })}

    return <div ref={ref}>
        <Dialog open={prompt === "set-store-password"}>
            <div style={{margin:'1em'}}>
                <h1>Encrypt Settings</h1>
                <div>
                   <TextField variant="standard" inputRef={passwordField1Ref} label="Settings Password" aria-label="Settings Password" name="settings-password" type="password" /><br />
                   <TextField variant="standard" inputRef={passwordField2Ref} label="Confirm Settings Password" aria-label="Confirm Settings Password" name="confirm-settings-password" type="password" />
                </div>
                <div>
                    <Button style={{display: "inline"}} variant="contained" onClick={() => {

                        if (passwordField1Ref.value !== passwordField2Ref.value) {
                            throw new Error("Passwords do not match.")
                        }

                        let password = passwordField1Ref.current.value
                        if (password && password.length === 0) {
                            password = null
                        }

                        setPassword(password)
                        saveSettings(password, settings)

                    }}>Set Password</Button>
                    <Button style={{display: "inline"}} variant="outlined" onClick={() => {
                        setPrompt(false)
                    }}>Cancel</Button>
                </div>
            </div>
        </Dialog>

        <Dialog open={prompt === "set-load-password"}>
            <div style={{margin:'1em'}}>
                <h1>Decrypt Settings</h1>
                <div>
                   <TextField variant="standard" inputRef={passwordFieldRef} label="Config Password" aria-label="Config Password" name="config-password" type="password" />
                </div>
                <div>
                    <Button style={{display: "inline"}} variant="contained" onClick={() => {
                        loadSettings(passwordFieldRef.current.value, (err, settings) => {
                            if (err) {
                                console.error(err)
                                setSettings(emptySettings())
                            } else {
                                setSettings(settings)
                                setPassword(passwordFieldRef.current.value)
                            }

                            setPrompt(false)
                        })
                    }}>Set Password</Button>
                    <Button style={{display: "inline"}} variant="outlined" onClick={() => {
                        setSettings(emptySettings())
                        setPrompt(false)
                    }}>Cancel</Button>
                </div>
            </div>
        </Dialog>

        {/* Settings Loader <br />
        <TextField variant="standard" type="password" aria-label="Config Password" label="Config Password" name="config-password"></TextField> */}

        {settings ? props.children : ""}

    </div>
}