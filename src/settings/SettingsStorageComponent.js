/**
 * A component that will load the configuration settings
 * and can prompt for a password if one is required.
 * 
 * This will use some functions from SeettingsStorer to do this work.
 */

import { useEffect, useRef, useContext, useState } from "react"
import { needPasswordEventType } from "./SettingsEvent"
import SettingsContext from "./SettingsContext"
import { DocCrypt } from "@basking2/docryptjs"

const { TextField, Dialog, Button } = require("@mui/material")
const docCrypt = DocCrypt.aes256cbc()

export const s3NotesConfig = "s3NotesConfig"

function storeSettings(password, settings, callback) {
    if (password) {
        const salt = DocCrypt.salt(32)
        let stateStr = JSON.stringify(settings)
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
        let stateStr = JSON.stringify(settings)
        localStorage.setItem(s3NotesConfig, stateStr)
        callback(null)
    }
}

function loadSettings(password, callback) {
    let config = ''

    if (s3NotesConfig in localStorage) {
        config = JSON.parse(localStorage.getItem(s3NotesConfig))

        if ('ciphertext' in config) {
            if (password) {
                docCrypt.decryptString({...config, password})
                    .catch(callback)
                    .then(val =>{
                        val = JSON.parse(val)
                        callback(null, val)
                        return val
                    })
            } else {
                callback(new Error("no password"), null)
            }

        } else {
            callback(null, config)
        }
    } else {
        callback(null, emptyConfig())
    }
}

function emptyConfig() {
    return {password: null, settings: {type: "none"}}
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

                        storeSettings(passwordField1Ref.current.value, settings, (err, settings) => {
                            if (err) {
                                console.error(err)
                            } else {
                                setSettings(settings)
                                setPassword(passwordField1Ref.current.value)
                            }

                            setPrompt(false)
                        })
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
                                console.error(err)
                            } else {
                                setSettings(settings)
                                setPassword(passwordFieldRef.current.value)
                            }

                            setPrompt(false)
                        })
                    }}>Set Password</Button>
                    <Button style={{display: "inline"}} variant="outlined" onClick={() => {
                        setSettings(emptyConfig())
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