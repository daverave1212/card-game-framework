import { useContext, useState } from "react"
import Card from "./Card.jsx"
import { BoardContext } from "./BoardContext.js"
import { HEARTHSTONE_CONFIG_TEMPLATE } from "../example/HearthstoneBoard.jsx"
import { useLocalStorageState } from "../utils.js"
import { useLocalZoneState } from "../card-game-framework.js"

export default function CardZone({ name, Test, config, className, style }) {

    const boardContext = useContext(BoardContext)
    const zoneIndex = config.zones.findIndex(zone => zone.name == name)
    
    const zoneConfig = config.zones[zoneIndex]
    const initialState = zoneConfig.initialState

    const [ state, setState ] = useLocalZoneState(name, initialState)
    
    console.log({zoneConfig})
    console.log({initialState})
    console.log({state})


    return <div className={className} style={style}>
        { state.cardStates.map(cardState => (
            <Card
                cardState={cardState}
                onClick={() => zoneConfig.defaultCardClickHandler(cardState)} 
                CardRendererComponent={zoneConfig.cardRendererComponent}
            />
        )) }
    </div>
}