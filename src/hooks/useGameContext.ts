import {useContext} from "react";
import {GameContext} from "../context/GameContext";

export const useGameContext = () => {
  const gameContext = useContext(GameContext)

  return {
    ...gameContext
  }
}
