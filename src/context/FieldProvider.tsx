import type {GameContextProps} from './FieldContext'
import {FieldContext} from './FieldContext'
import {getInitial} from "./initial";
import React, {useState} from "react"

interface GameProviderProps {
  children: React.ReactNode
}

export const FieldProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameStore, setGameState] = useState(getInitial())

  const value: GameContextProps = React.useMemo(
    () => ({ gameStore, setGameState }),
    [gameStore]
  )

  return <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
}
