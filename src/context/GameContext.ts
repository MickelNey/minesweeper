import React from "react";
import type {IField} from 'api'
import { getInitial } from './initial'
import {GameStep} from "../api";

export type GameStore = {
  step: GameStep
  field: IField
  isClickOnCell: boolean
}

export interface GameContextProps {
  gameStore: GameStore
  setGameState: React.Dispatch<React.SetStateAction<GameStore>>;
}

export const GameContext = React.createContext<GameContextProps>({
  gameStore: getInitial(),
  setGameState: () => {}
})

