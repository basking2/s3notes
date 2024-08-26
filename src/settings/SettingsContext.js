import { createContext, useState } from "react";

const SettingsContext = createContext({})

/**
 * Fetches stored user settings from local storage.
 * 
 * @returns an array with a [value, setValue] pair like useState() does.
 */
export const useSettingsContext = () => {
    return useState(null)
}

export default SettingsContext