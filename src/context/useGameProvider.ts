import {useContext} from "react";
import {GameContext, GameStore} from "./GameContext";

export const useGameProvider = () => {
  const gameContext = useContext(GameContext)

  return {
    ...gameContext
  }
}
