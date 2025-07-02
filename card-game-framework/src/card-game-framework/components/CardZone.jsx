import { useContext } from "react"
import { BoardContext } from "./Board/Board"
import Card from "./Card"


export default function CardZone({ name }) {

    const boardContext = useContext(BoardContext)
    
    const [ state, setState ] = boardContext.zoneStatesByName[name]
    const config = zoneConfigs[name]

    const { cardStates } = state

    const CardRendererComponent = config.CardRendererComponent

    return <div>
        { cards.map(cardDto => (
            <Card cardDto={cardDto} // TODO
        )) }
    </div>
}