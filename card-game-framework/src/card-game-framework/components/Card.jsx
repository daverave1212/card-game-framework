

export default function Card({ cardState, CardRendererComponent, onClick }) {
    return <div onClick={onClick}>
        <CardRendererComponent cardState={cardState}></CardRendererComponent>
    </div>
}