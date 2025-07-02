// This can have any properties
export const CardTemplate = {
    name: 'Frostwolf Grunt',
    src: 'image.png',
    backSrc: 'card-back.png',
    health: 2,
    attack: 2,
    data: {}    // Anything
}

// Boards Part: these are global, anyone can see them
export const TopBoardPartTemplate = {
    name: 'TopBoard'
}
export const BottomBoardPartTemplate = {
    name: 'BottomBoard'
}

export const BoardTemplate = {
    zones: [
        TopBoardPartTemplate,
        BottomBoardPartTemplate
    ]
}



// Personal Zones
export const HandZoneTemplate = {
    name: 'HandZone'
}
export const MyDeckZoneTemplate = {
    name: 'MyDeckZone'
}
export const PersonalZoneTemplate = {
    zones: [
        HandZoneTemplate,
        MyDeckZoneTemplate
    ]
}


// Decks
export const DeckTemplate = {
    name: 'MyDeck',
    cards: [
        CardTemplate,
        CardTemplate,
        CardTemplate,
        CardTemplate,
    ]
}
