import {FieldService, GameStep} from "../api";
import {useFieldContext} from "../context";
import {useState} from "react";

export const useSmileHandlers = () => {
  const {setGameState, gameStore }= useFieldContext()
  const [isMouseDown, setIsMouseDown] = useState(false)

  const handleOnMouseDown = () => {
    setIsMouseDown(true)
  }

  const handleOnMouseUp = () => {
    setGameState({  field: FieldService.clearField(gameStore.field), step: GameStep.NOT_STARTED} )
    setIsMouseDown(false)
  }

  const handleOnMouseLeave = () => {
    setIsMouseDown(false)
  }

  return {handleOnMouseDown, handleOnMouseLeave, handleOnMouseUp, isMouseDown}
}
