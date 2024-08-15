import { useState } from 'react'

export const getLocalStorage = (keyName: string, defaultValue: any) => () => {
    try {
        const value = window.localStorage.getItem(keyName)
        if (value) {
            return JSON.parse(value)
        } else {
            window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
            return defaultValue
        }
    } catch (err) {
        return defaultValue
    }
}

export const setLocalStorage = (keyName: string, newValue: any) => {
    try {
        window.localStorage.setItem(keyName, JSON.stringify(newValue))
    } catch (err) {
        console.log(err)
    }
}

export const useLocalStorage = (keyName: string, defaultValue: any) => {
    const [storedValue, setStoredValue] = useState(getLocalStorage(keyName, defaultValue))
    const setValue = (newValue: any) => {
        setLocalStorage(keyName, newValue)
        setStoredValue(newValue)
    }
    return [storedValue, setValue]
}
