import { useState } from "react"
import { CardGame } from "../card-game-api.js"
import { ZoneTypes } from "../card-game-framework.js"
import Board from "../components/Board.jsx"
import CardZone from "../components/CardZone.jsx"
import Deck from "../components/Deck.jsx"
import { HearthstoneCard } from "./HearthstoneCard.jsx"
import { HearthstoneCardBack } from "./HearthstoneCardBack.jsx"

const cardGame = new CardGame('TestGame')

cardGame.setConfig({
    game: {
        name: 'HearthstoneGame',
    },
    zones: [
        {
            name: "Hand",
            type: ZoneTypes.HAND,
            connectionType: 'local',
            cardRendererComponent: HearthstoneCard,
            initialState: {
                cardStates: [
                    'Big Yeti',
                    'DARK SHAMAN',
                    'Salami',
                    'The Concept of Consciousness',
                ]
            },
            defaultCardClickHandler: function(cardState) {
                cardGame.moveCardAsync(cardState, "MyBoard")
            }
        },
        {
            name: "MyDeck",
            type: ZoneTypes.DECK,
            connectionType: 'local',
            cardRendererComponent: HearthstoneCardBack,
            initialState: {
                cardStates: [
                    'Random Card',
                    'Random Card',
                    'Random Card',
                    'Random Card',
                    'Random Card',
                    'Random Card',
                    'Random Card',
                    'Random Card',
                ]
            },
            defaultCardClickHandler: function(cardState) {
                cardGame.moveCardAsync(cardState, "Hand")
            }
        },
        {
            name: 'MyBoard',
            type: ZoneTypes.CARD_ZONE,
            connectionType: 'local',
            cardRendererComponent: HearthstoneCard,
            initialState: {
                cardStates: [
                    "Big Man",
                    "Pickney",
                ]
            },
            defaultCardClickHandler: function(cardState) {
                cardGame.moveCardAsync(cardState, "EnemyBoard")
            }
        },
        {
            name: 'EnemyBoard',
            type: ZoneTypes.CARD_ZONE,
            connectionType: 'online',
            cardRendererComponent: HearthstoneCard,
            initialState: {
                cardStates: [
                    "Evil Dude",
                    "His Evil Pupper",
                ]
            },
            defaultCardClickHandler: function(cardState) {
                cardGame.moveCardAsync(cardState, "MyBoard")
            }
        }
    ]
})


export default function HearthstoneBoard() {

    

    const [isStarted, setIsStarted] = useState(false)

    return (
        <>
            <button onClick={async () => {
                localStorage.clear()
                await cardGame.startAsync()
                setIsStarted(true)
                console.log({cardGame})
            }}>Start Gaym</button>

            { isStarted && (
                <Board cardGame={cardGame}>
                    <div className="flex-row gap-1">
                        <div className="flex-column gap-1">
                            <Deck className="MyDeck" name="MyDeck" style={{border: 'solid brown 1px', minHeight: '300px', minWidth: '200px'}} cardGame={cardGame}/>
                        </div>
                        <div className="flex-column gap-1">
                            <CardZone className="flex-row gap-1" style={{border: 'solid teal 3px', minHeight: '250px'}} name="EnemyBoard" cardGame={cardGame}/>
                            <CardZone className="flex-row gap-1" style={{border: 'solid yellow 3px'}} name="MyBoard" cardGame={cardGame}/>
                            <CardZone className="flex-row" style={{gap: '-5%', border: 'solid black 3px'}} name="Hand" cardGame={cardGame}/>
                        </div>
                    </div>
                </Board>
            )}
        </>
    )
}