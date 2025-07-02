import { useState } from "react"

export function getLocalStorageJSON(keyName) {
    const value = localStorage.getItem(keyName)
    if (value == null || value == 'undefined') {
        return null
    }
    try {
        return JSON.parse(value)
    } catch (e) {
        throw `${e.toString()} -- keyName: ${keyName}`
    }
}
export function setLocalStorageJSON(keyName, value) {
    if (value == null) {
        localStorage.removeItem(keyName)
    } else {
        try {
            localStorage.setItem(keyName, JSON.stringify(value))
        }  catch (e) {
            throw `${e.toString()} -- keyName: ${keyName}, value: ${value}`
        }
    }
    window.dispatchEvent(new CustomEvent('custom-storage', { detail: {
        key: keyName,
        value: value
    } }))
}

export function useLocalStorageState(keyName, defaultValue) {
    const existingValue = getLocalStorageJSON(keyName)
    if (existingValue == null) {
        localStorage.setItem(keyName, JSON.stringify(defaultValue))
    }

    const [state, setInnerState] = useState(existingValue == null? defaultValue: existingValue)
    
    useEffect(() => {
        window.addEventListener('custom-storage', evt => {
            if (evt.detail.key == keyName) {
                if (evt.detail.value == null || evt.detail.value == 'undefined') {
                    setInnerState(null)    
                } else {
                    setInnerState(evt.detail.value)
                }
            }
        })

        window.addEventListener('storage', evt => {
            if (evt.key == keyName) {
                if (evt.newValue == null || evt.newValue == 'undefined') {
                    setInnerState(null)
                } else {
                    setInnerState(JSON.parse(evt.newValue))
                }
            }
        })
    }, [])

    function setState(newState) {
        if (newState != null && newState.src != null) {
            console.log(`setState for key ${keyName} with newValue: ${JSON.stringify(newState)}`)
        }
        localStorage.setItem(keyName, JSON.stringify(newState))
        window.dispatchEvent(new CustomEvent('custom-storage', { detail: {
            key: keyName,
            value: newState
        } }))
        setInnerState(newState)
    }

    return [state, setState]
}