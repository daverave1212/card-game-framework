

export default function Card({ cardDto, CardRendererComponent }) {
    return <div>
        <CardRendererComponent cardDto={cardDto}></CardRendererComponent>
    </div>
}