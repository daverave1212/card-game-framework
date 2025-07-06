import { createDocument, getDocument, useRealtimeDatabaseForDocument } from "../services/external/FirebaseRealtimeDatabase"
import { getZoneConfig } from "./card-game-api"
import { getLocalStorageJSON, setLocalStorageJSON, useLocalStorageState } from "./utils"

export const ZoneTypes = {
    HAND: 'HAND',
    CARD_ZONE: 'CARD_ZONE',
    DECK: 'DECK'
}

export const ONLINE_ZONE_PATH = 'games/test/zones'

export function getOnlineZoneName(zoneName) {
    return ONLINE_ZONE_PATH + '/' + zoneName
}

// Local
export function useLocalGetSetZoneState(zoneName) {
    const getZoneState = () => getLocalStorageJSON(zoneName)
    const setZoneState = state => setLocalStorageJSON(zoneName, state)
    return [getZoneState, setZoneState]
}

export function useLocalZoneState(zoneName, defaultState) {
    return useLocalStorageState(zoneName, defaultState)
}


// Online
export async function createOnlineZoneState(zoneName, cardGame) {
    if (typeof zoneName != 'string') {
        throw `createOnlineZoneState: Use like createOnlineZoneState(zoneName: string, cardGame: CardGame)`
    }
    if (cardGame == null) {
        throw `createOnlineZoneState: cardGame param is null`
    }
    const path = cardGame.getOnlineZonePath(zoneName)
    const config = cardGame.getZoneConfig(zoneName)
    await createDocument(path, config.initialState)
}

export function useOnlineGetSetZoneState(zoneName, cardGame) {
    const getZoneStateAsync = async () => await getDocument(cardGame.getOnlineZonePath(zoneName))
    const setZoneStateAsync = async (zoneState) => await createDocument(cardGame.getOnlineZonePath(zoneName), zoneState)
    return [getZoneStateAsync, setZoneStateAsync]
}

export function useOnlineZoneState(zoneName, cardGame, defaultState) {
    return useRealtimeDatabaseForDocument(cardGame.getOnlineZonePath(zoneName), defaultState)
}