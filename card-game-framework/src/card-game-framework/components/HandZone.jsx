import { useContext, useState } from "react"
import Card from "./Card.jsx"
import { BoardContext } from "./BoardContext.js"
import { HEARTHSTONE_CONFIG_TEMPLATE } from "../example/HearthstoneBoard.jsx"
import { useLocalStorageState } from "../utils.js"
import { useLocalZoneState, useOnlineZoneState } from "../card-game-framework.js"

export default function HandZone({ name, cardGame, className, style }) {

    const config = cardGame.config
    const zoneIndex = config.zones.findIndex(zone => zone.name == name)
    
    const zoneConfig = config.zones[zoneIndex]
    const initialState = zoneConfig.initialState
    
    const [ state, setState ] =
        zoneConfig.connectionType == 'online'?
            useOnlineZoneState(name, cardGame, initialState):
        useLocalZoneState(name, initialState)
    

    return <div className={className} style={style}>
        { state?.cardStates?.map(cardState => (
            <Card
                cardState={cardState}
                onClick={() => zoneConfig.defaultCardClickHandler(cardState)} 
                CardRendererComponent={zoneConfig.cardRendererComponent}
            />
        )) }
    </div>
}