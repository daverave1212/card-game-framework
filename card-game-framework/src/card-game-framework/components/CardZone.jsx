import { useContext, useState } from "react"
import Card from "./Card.jsx"
import { BoardContext } from "./BoardContext.js"
import { HEARTHSTONE_CONFIG_TEMPLATE } from "../example/HearthstoneBoard.jsx"
import { useLocalStorageState } from "../utils.js"

export default function CardZone({ name, Test, config, className, style }) {

    const boardContext = useContext(BoardContext)
    const zoneIndex = config.zones.findIndex(zone => zone.name == name)
    
    const zoneConfig = config.zones[zoneIndex]
    const initialState = zoneConfig.initialState
    const cardStates = initialState.cardStates
    
    
    const [ state, setState ] = boardContext.zoneStates[name]

    console.log({zoneConfig})
    console.log({initialState})
    console.log({cardStates})
    console.log({state})


    return <div className={className} style={style}>
        { state.cardStates.map(cardState => (
            <Card
                cardState={cardState}
                onClick={() => zoneConfig.defaultCardClickHandler(cardState, boardContext.cardGameAPI)} 
                CardRendererComponent={zoneConfig.cardRendererComponent}
            />
        )) }
    </div>
}