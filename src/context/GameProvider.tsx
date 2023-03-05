import type {GameContextProps} from './GameContext'
import {GameContext} from './GameContext'
import {getInitial} from "./initial";
import React, {useState} from "react"

interface GameProviderProps {
  children: React.ReactNode
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameStore, setGameState] = useState(getInitial())

  const value: GameContextProps = React.useMemo(
    () => ({ gameStore, setGameState }),
    [gameStore]
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
