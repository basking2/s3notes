import { createContext, useContext } from "react";
import { useState } from 'react';
import { dispatchNeedPasswordEvent } from "./SettingsEvent";
import { DocCrypt } from "@basking2/docryptjs";

export const s3NotesConfig = "s3NotesConfig"

const SettingsContext = createContext({})

let password = null

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

        if (s3NotesConfig in localStorage) {
            let config = JSON.parse(localStorage.getItem(s3NotesConfig))

            return config
        }

        return emptyConfig()
    })

    return [
        state,
        (newState) => {
            if (password) {
            }
            const dc = DocCrypt.aes256cbc()
            setState(newState)
        }
    ]
}

export default SettingsContext