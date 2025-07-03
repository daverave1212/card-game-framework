import { ZoneTypes } from "../card-game-framework.js"
import Board from "../components/Board.jsx"
import CardZone from "../components/CardZone.jsx"
import { HearthstoneCard } from "./HearthstoneCard.jsx"
import { HearthstoneCardBack } from "./HearthstoneCardBack.jsx"

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
                cardStates: [
                    {
                        name: "Big Man"
                    },
                    {
                        name: "Pickney"
                    }
                ]
            },
            defaultCardClickHandler: function(cardState, api) {
                api.addCardToZone({
                    name: "New Card"
                }, "My Board")
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

function TestComponent() {
    return <div>Test test test</div>
}

export default function HearthstoneBoard() {
    return (
        <Board config={HEARTHSTONE_CONFIG_TEMPLATE}>
            {/* <CardZone className="flex-row gap-1" name="Enemy Board" config={HEARTHSTONE_CONFIG_TEMPLATE}/> */}
            <CardZone className="flex-row gap-1" name="My Board" config={HEARTHSTONE_CONFIG_TEMPLATE}/>
        </Board>
    )
}