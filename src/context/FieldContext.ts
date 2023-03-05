import React from "react";
import type {IField} from 'api'
import { getInitial } from './initial'
import {GameStep} from "../api";

export type GameStore = {
  step: GameStep
  field: IField
}

export interface GameContextProps {
  gameStore: GameStore
  setGameState: React.Dispatch<React.SetStateAction<GameStore>>;
}

export const FieldContext = React.createContext<GameContextProps>({
  gameStore: getInitial(),
  setGameState: () => {}
})

