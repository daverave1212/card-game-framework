import React, { useState } from "react";
import { BoardContext } from "./BoardContext";
import { useLocalStorageState } from "../utils";

function createZoneStates({ zones }) {
    const localStorageStatesForZoneByName = {}

    for (const zone of zones) {
        const [zoneState, setZoneState] = useState(zone.name, zone.initialState)
        console.log(`At zone ${zone.name} with zoneState=`)
        console.log({initialState: zone.initialState})
        console.log({zoneState})
        localStorageStatesForZoneByName[zone.name] = [zoneState, setZoneState]
    }

    return {
        zoneStates: localStorageStatesForZoneByName
    }
}

// TODO: This doesn't work
// IDEA: Make zones predefined with names (it sucks but maybe it works)
// IDEA: Use the intricacies of local storage states.

export default function Board({ config, children }) {

    const { zoneStates } = createZoneStates(config)   // Persistent between sessions

    const cardGameAPI = {
        addCardToZone: function(cardState, zoneName) {
            const [zoneState, setZoneState] = zoneStates[zoneName]
            const newZoneState = zoneState
            newZoneState.cardStates.push(cardState)
            setZoneState(newZoneState)
        }
    }

    const boardContext = {
        config,
        zoneStates,
        cardGameAPI
    }

    // Children will be CardZones, Decks or Hands
    return (
        <BoardContext.Provider value={boardContext}>
            <div style={{border: 'solid red 2px'}}>
                { children }
            </div>
        </BoardContext.Provider>
    )
}