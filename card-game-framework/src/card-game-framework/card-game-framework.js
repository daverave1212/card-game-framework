import { getLocalStorageJSON, setLocalStorageJSON, useLocalStorageState } from "./utils"

export const ZoneTypes = {
    HAND: 'HAND',
    CARD_ZONE: 'CARD_ZONE',
    DECK: 'DECK'
}

export function useLocalGetSetZoneState(zoneName) {
    const getZoneState = () => getLocalStorageJSON(zoneName + '-State')
    const setZoneState = state => setLocalStorageJSON(zoneName + '-State', state)
    return [getZoneState, setZoneState]
}

export function useLocalZoneState(zoneName, defaultState) {
    return useLocalStorageState(zoneName + '-State', defaultState)
}

export function addNewCardToZone(cardState, zoneName) {
    const [getZoneState, setZoneState] = useLocalGetSetZoneState(zoneName)
    const zoneState = getZoneState()
    const newZoneState = zoneState
    const newCardState = createCard(cardState, zoneName)
    newCardState.zoneName = zoneName
    newZoneState.cardStates.push(newCardState)
    setZoneState(newZoneState)
}

export function createCard(cardState) {
    return {
        ...cardState,
        id: crypto.randomUUID(),
        zoneName: null
    }
}