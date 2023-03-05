import {useFieldContext} from "../context";
import React, {useState} from "react";
import {CellLocation, FieldService, GameStep} from "../api";
import {GameService} from "../api/GameService";

export const useCellHandlers = (cl: CellLocation) => {

  const { gameStore, setGameState} = useFieldContext()
  const [isMouseDown, setIsMouseDown] = useState(false)

  const handleLeave = () => {
    setIsMouseDown(false)
  }

  const handleOnMouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsMouseDown(true)
    event.preventDefault()
    if (gameStore.step === GameStep.WAIT_TURN && event.button === 0) {
      setGameState({ ...gameStore, step: GameStep.CLICK_ON_CELL})
    }
  }

  const handleOnMouseUp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsMouseDown(false)
    if (event.button === 0) {
      if (gameStore.step === GameStep.NOT_STARTED) {
        setGameState( { step: GameStep.WAIT_TURN, field: FieldService.start(cl, gameStore.field) })
      }
      else if (gameStore.step === GameStep.WAIT_TURN || gameStore.step === GameStep.CLICK_ON_CELL)
        setGameState((prevState) => {
          const field = FieldService.openOne(cl, prevState.field)
          const gameStep = GameService.getGameStepAfterOpened(cl, field)

          return { field, step: gameStep}
        })
    }
  }

  const handleRightClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setGameState({ ...gameStore, field: FieldService.changeOne(cl, gameStore.field)})
  }

  return { mouseDownState: isMouseDown, handleOnMouseDown, handleLeave, handleOnMouseUp, handleRightClick}
}
