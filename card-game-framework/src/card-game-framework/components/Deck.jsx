import { useContext, useState } from "react"
import Card from "./Card.jsx"
import { useLocalZoneState, useOnlineZoneState } from "../card-game-framework.js"

export default function Deck({ name, cardGame, className, style }) {

    const config = cardGame.config
    const zoneIndex = config.zones.findIndex(zone => zone.name == name)
    
    const zoneConfig = config.zones[zoneIndex]
    const initialState = zoneConfig.initialState

    const [ state, setState ] =
        zoneConfig.connectionType == 'online'?
            useOnlineZoneState(name, cardGame, initialState):
        useLocalZoneState(name, initialState)
    
    const nCards = state.cardStates.length

    const deckThickness =
        (0 < nCards && nCards <= 10)?
            (nCards):
        (10 < nCards && nCards <= 20)?
            (10 + Math.floor((nCards - 10) / 2)):
        (10 + Math.floor((nCards - 10) / 2) + 1)

    const lastCard = state?.cardStates?.[state.cardStates.length - 1]

    return <div className={`center-content ${className}`} style={style}>
        { nCards > 0 && (
            <div className="flex-column">
                <Card
                    cardState={lastCard}
                    onClick={() => zoneConfig.defaultCardClickHandler(lastCard)} 
                    CardRendererComponent={zoneConfig.cardRendererComponent}
                    childStyle={{
                        boxSizing: 'content-box',
                        borderBottom: `solid gray ${deckThickness}px`,
                    }}
                />
            </div>
        )}
    </div>
}