

export default function Card({ cardState, CardRendererComponent, onClick, className, style, childStyle }) {
    return <div onClick={onClick} style={style} className={className}>
        <CardRendererComponent cardState={cardState} style={childStyle}></CardRendererComponent>
    </div>
}