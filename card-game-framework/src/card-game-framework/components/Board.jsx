import React, { useEffect, useState } from "react";
import { BoardContext } from "./BoardContext";
import { useLocalStorageState } from "../utils";

export default function Board({ cardGame, children }) {

    const boardContext = {
        config: cardGame.config
    }


    // Children will be CardZones, Decks or Hands
    return (
        <BoardContext.Provider value={boardContext}>
            { true && (
                <div style={{border: 'solid red 2px'}}>
                    { children }
                </div>
            )}
        </BoardContext.Provider>
    )
}