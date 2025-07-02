import { useState } from "react"

const ZoneType =
    'board' |       // Cards can go here
    'hand' |
    'deck'

const ZoneNetworkType = 
    'local' |
    'online'

const ZoneConfigTemplate = {
    name: 'Board',
    type: 'board' || ZoneType,
    networkType: 'online' || ZoneNetworkType
}


class Zone {

    constructor({ name, type, networkType } = ZoneConfigTemplate) {
        this.name = name
        this.type = type
        this.networkType = networkType
    }

    async removeCard(card) {
        // Remove card locally
        if (this.networkType == 'online') {
            // POST update board state
        }
    }

    async addCard(card) {
        // Add card locally
        if (this.networkType == 'online') {
            // POST update board state
        }
    }

}

function game(zones) {

    const zonesMap = {}
    for (const zone in zones) {
        zonesMap[zone.name] = new Zone(zone)
    }

}



export async function playCardOnZone(card, zone) {
    // Remove card from its original zone: card.zone.removeCard(zone)
    // Update board state locally: zone.addCard(card)
        // Handled differently based on zone
    // POST update board state
}

export async function drawCardFromDeckToZone(deck, zone) {
    const lastCard = 'last of deck.cards'
    playCardOnZone(lastCard, zone)
}