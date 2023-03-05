import {FieldService, GameStep} from "../api";
import {useGameContext} from "./useGameContext";
import {useState} from "react";

export const useSmileHandlers = () => {
  const {setGameState, gameStore }= useGameContext()
  const [isMouseDown, setIsMouseDown] = useState(false)

  const handleOnMouseDown = () => {
    setIsMouseDown(true)
  }

  const handleOnMouseUp = () => {
    setGameState({  ...gameStore, field: FieldService.clearField(gameStore.field), step: GameStep.NOT_STARTED} )
    setIsMouseDown(false)
  }

  const handleOnMouseLeave = () => {
    setIsMouseDown(false)
  }

  return {handleOnMouseDown, handleOnMouseLeave, handleOnMouseUp, isMouseDown}
}
