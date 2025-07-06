import { useEffect, useState } from "react";
import { app } from "./Firebase";
import { get, getDatabase, onValue, ref, set } from "firebase/database";


const database = getDatabase(app)

export async function createDocument(path, data) {
    try {
        const docRef = ref(database, path)
        await set(docRef, data)
    } catch (error) {
        console.error(`Error creating Firebase object: ${path} with data printed below;`, error)
        console.log({data})
    }
}

export async function getDocument(path) {
    try {
        const snapshot = await get(ref(database, path))
        if (snapshot.exists()) {
            return snapshot.val()
        } else {
            return null
        }
    } catch (error) {
        console.error(`Error retrieving Firebase object: ${path}`, error)
    }
}

export async function documentExists(path) {
    const snapshot = await get(ref(database, path))
    return snapshot.exists()
}

export function onDocumentChanged(path, func) {
    const objectRef = ref(database, path)

    onValue(objectRef, snapshot => {
        const data = snapshot.val()
        if (data) {
            func(data)
        } else {
            func(null)
        }
    }, error => {
        console.error(`Error listening to changes at ${path}:`, error);
    })
}

export function useRealtimeDatabaseForDocument(path, initialValue) {

    const [obj, setObj] = useState(initialValue)

    useEffect(() => {
        const doUseEffectAsync = async () => {
            if (await documentExists(path)) {
                setObj(await getDocument(path))
            } else {
                await createDocument(path, initialValue)
            }
    
            onDocumentChanged(path, newObj => {
                // Void rerender for no reason
                if (JSON.stringify(obj) != JSON.stringify(newObj)) {
                    setObj(newObj)
                }
            })
        }

        doUseEffectAsync()
        
    }, [])

    return [obj, setObj]
}

