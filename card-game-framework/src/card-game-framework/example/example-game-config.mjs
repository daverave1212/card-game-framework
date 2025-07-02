import Board from "../components/Board/Board"
import CardZone from "../components/CardZone"
import { useLocalStorageState } from "../utils.mjs"

// This can have any properties
export const CardTemplate = {
    name: 'Frostwolf Grunt',
    src: 'image.png',
    backSrc: 'card-back.png',
    health: 2,
    attack: 2,
    data: {}    // Anything
}

export const ZoneTypes = {
    HAND: 'HAND',
    CARD_ZONE: 'CARD_ZONE',
    DECK: 'DECK'
}

export function HearthstoneCard({ cardDto }) {
    return (
        <div style={{width: '300px', height: '550px', backgroundColor: 'green', borderRadius: '10px', padding: '2rem'}}>
            <h1 style={{fontSize: '1.5rem'}}>{ cardDto.name }</h1>
        </div>
    )
}

export function HearthstoneCardBack({ cardDto }) {
    return (
        <div style={{width: '300px', height: '550px', backgroundColor: 'blue', borderRadius: '10px', padding: '2rem'}}></div>
    )
}

export const HEARTHSTONE_CONFIG_TEMPLATE = {
    zones: [
        {
            name: "Hand",
            type: ZoneTypes.HAND,
            connectionType: 'local',
            cardRendererComponent: HearthstoneCard,
            initialState: {
                cardStates: []
            }
        },
        {
            name: "My Deck",
            type: ZoneTypes.DECK,
            connectionType: 'local',
            cardRendererComponent: HearthstoneCardBack,
            initialState: {
                cardStates: []
            }
        },
        {
            name: 'My Board',
            type: ZoneTypes.CARD_ZONE,
            connectionType: 'online',
            cardRendererComponent: HearthstoneCard,
            initialState: {
                cardStates: []
            }
        },
        {
            name: 'Enemy Board',
            type: ZoneTypes.CARD_ZONE,
            connectionType: 'local',
            cardRendererComponent: HearthstoneCard,
            initialState: {
                cardStates: []
            }
        }
    ]
}



export function HearthstoneBoard() {
    return <Board config={HEARTHSTONE_CONFIG_TEMPLATE}>
        
    </Board>
}