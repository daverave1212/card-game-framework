export function HearthstoneCard({ cardState, style }) {

    return (
        <div style={{width: '200px', height: '300px', backgroundColor: 'green', borderRadius: '10px', padding: '2rem', ...style}}>
            <h1 style={{fontSize: '1.5rem'}}>{ cardState?.name }</h1>
            { cardState.id != null && (
                <div>{ cardState.id }</div>
            )}
        </div>
    )
}