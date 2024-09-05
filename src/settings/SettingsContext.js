import { createContext, useContext } from "react";
import { useState } from 'react';
import { dispatchNeedPasswordEvent } from "./SettingsEvent";
import { DocCrypt } from "@basking2/docryptjs";

export const s3NotesConfig = "s3NotesConfig"

const SettingsContext = createContext({})

let password = null

const docCrypt = DocCrypt.aes256cbc()

function emptyConfig() {
    return {password: null, settings: {type: "none"}}
}

/**
 * Fetches stored user settings from local storage.
 * 
 * @returns an array with a [value, setValue] pair like useState() does.
 */
export const useSettingsContext = () => {
    const [state, setState] = useState(() => {

        let config = ''

        if (s3NotesConfig in localStorage) {
            config = JSON.parse(localStorage.getItem(s3NotesConfig))

            if ('ciphertext' in config) {
                if (password) {
                    docCrypt.decryptString({...config, password})
                        .then(val =>{
                            val = JSON.parse(val)
                            setState(val)
                        })
                    config = emptyConfig()
                } else {
                    // Return encrypted config.
                    return config
                }

            }

            return config
        }

        return emptyConfig()
    })

    return [
        state,
        (newState) => {

            setState(newState)

            if (password) {
                const salt = DocCrypt.salt(32)
                let stateStr = JSON.stringify(newState)
                docCrypt.encryptString(password, salt, stateStr).then(stateStr => {
                    // We choose to store our password salt.
                    stateStr['salt'] = salt
                    stateStr = JSON.stringify(stateStr)
                    localStorage.setItem(s3NotesConfig, stateStr)
                }).catch(e => {
                    console.error(e)
                })
            } else {
                let stateStr = JSON.stringify(newState)
                localStorage.setItem(s3NotesConfig, stateStr)
            }
        }
    ]
}

export default SettingsContext