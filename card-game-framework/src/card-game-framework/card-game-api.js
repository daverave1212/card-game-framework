import { createDocument } from "../services/external/FirebaseRealtimeDatabase"
import { createOnlineZoneState, useLocalGetSetZoneState, useOnlineGetSetZoneState } from "./card-game-framework"

function detachCardStateFromZoneState(cardState, zoneState) {
    zoneState.cardStates = zoneState.cardStates.filter(cs => cs.id != cardState.id)
    cardState.zoneName = null
}

function createCard(cardState) {
    return {
        ...cardState,
        id: crypto.randomUUID(),
        zoneName: null
    }
}

export class CardGame {

    config
    name
    
    constructor(name) {
        this.name = name
    }

    getOnlineZonePath(zoneName) {
        return `games/${this.name}/zones/${zoneName}`
    }

    getZoneConfig(zoneName) {
        if (this.config == null) {
            throw `Can't getZoneConfig with null config. Set the config first with setConfig`
        }
        const zone = this.config.zones.find(zone => zone.name == zoneName)
        return zone
    }

    setConfig(config) {
        this.config = {...config}
        this.config.zones = fixZoneCards(this.config.zones)
    }

    async startAsync() {
        for (const zone of this.config.zones) {
            if (zone.connectionType != 'online') {
                continue
            }

            await createOnlineZoneState(zone.name, this)
        }
    }

    async moveCardAsync(cardState, toZoneName) {
        await this.detachCardAsync(cardState, this.config)
        await this.attachCardToZoneAsync(cardState, toZoneName, this.config)
    }

    async detachCardAsync(cardState) {
        if (cardState == null) {
            throw `Null card given to detachCard`
        }
        if (cardState.zoneName == null) {
            return
        }
        const zoneConfig = getZoneConfig(cardState.zoneName, this.config)
    
        let getFromZoneState, setFromZoneState
        if (zoneConfig.connectionType == 'online') {
            [getFromZoneState, setFromZoneState] = useOnlineGetSetZoneState(cardState.zoneName, this)
            const zoneState = await getFromZoneState()
            detachCardStateFromZoneState(cardState, zoneState)
            await setFromZoneState(zoneState)
        } else {
            [getFromZoneState, setFromZoneState] = useLocalGetSetZoneState(cardState.zoneName, this)
            const zoneState = getFromZoneState()
            detachCardStateFromZoneState(cardState, zoneState)
            setFromZoneState(zoneState)        
        }
    }

    

    async attachCardToZoneAsync(cardState, zoneName) {
        if (cardState.zoneName != null) {
            throw `Can't attach card ${cardState.name} to zone ${zoneName} because it's already attached to ${cardState.zoneName}`
        }
        if (this.config == null) {
            throw `Null config`
        }
    
        cardState.zoneName = zoneName
    
        const zoneConfig = getZoneConfig(cardState.zoneName, this.config)
        let getFromZoneState, setFromZoneState
        if (zoneConfig.connectionType == 'online') {
            [getFromZoneState, setFromZoneState] = useOnlineGetSetZoneState(cardState.zoneName)
            const zoneState = await getFromZoneState()
            zoneState.cardStates.push(cardState)
            await setFromZoneState(zoneState)
        } else {
            [getFromZoneState, setFromZoneState] = useLocalGetSetZoneState(cardState.zoneName)
            const zoneState = getFromZoneState()
            zoneState.cardStates.push(cardState)
            setFromZoneState(zoneState)
        }
    }

    async addNewCardToZoneAsync(cardState, zoneName) {
        const newCardState = createCard(cardState, zoneName)
        await this.attachCardToZoneAsync(newCardState, zoneName, this.config)
        return newCardState
    }

}

function fixZoneCards(zones) {
    return zones.map(zone => {
        const { cardStates } = zone.initialState
        const newCardStates = cardStates.map(cardState => {
            if (typeof cardState == 'string') {
                const card = createCard({ name: cardState })
                card.zoneName = zone.name
                return card
            }
            const newCardState = createCard(cardState)
            newCardState.zoneName = zone.name
            return card
        })
        const newZone = {...zone, initialState: {...cardStates.initialState, cardStates: newCardStates}}
        return newZone
    })
}

export function getZoneConfig(zoneName, config) {
    const zone = config.zones.find(zone => zone.name == zoneName)
    return zone
}




