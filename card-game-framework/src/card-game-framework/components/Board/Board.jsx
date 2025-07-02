import React, { useState } from "react";
import CardZone from "../CardZone";

function createZoneStates({ zones }) {
    const localStorageStatesForZoneByName = {}

    for (const zone of zones) {
        const [zoneState, setZoneState] = useLocalStorageState(zone.name, zone.initialState)
        localStorageStatesForZoneByName[zone.name] = [zoneState, setZoneState]
    }

    return {
        zoneStatesByName: localStorageStatesForZoneByName
    }
}

function createZoneConfigsByName({ zones }) {
    const zoneConfigs = {}
    
    for (const zoneConfig of zones) {
        zoneConfigs[zone.name] = zoneConfig
    }
    
    return {
        zoneConfigs
    }
}



export const BoardContext = React.createContext(null)

export default function Board({ config, children }) {

    const { zones } = config

    const { zoneStatesByName } = createZoneStates(config.zones)   // Persistent between sessions
    const { zoneConfigs } = createZoneConfigsByName(config.zones)

    const boardContext = {
        config,
        zoneStatesByName,
        zoneConfigs
    }

    return (
        <BoardContext.Provider value={boardContext}>
            { children }
        </BoardContext.Provider>
    )
}