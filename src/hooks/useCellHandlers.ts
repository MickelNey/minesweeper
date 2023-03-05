import {useGameProvider} from "../context";
import React, {useState} from "react";
import {CellLocation, FieldService, GameStep, GameService } from "../api";

export const useCellHandlers = (cl: CellLocation) => {

  const { gameStore, setGameState} = useGameProvider()
  const [isMouseDown, setIsMouseDown] = useState(false)

  const handleLeave = () => {
    setIsMouseDown(false)
  }

  console.log(gameStore)
  const handleOnMouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsMouseDown(true)
    event.preventDefault()
    if (gameStore.step === GameStep.WAIT_TURN && event.button === 0) {
      setGameState({ ...gameStore, isClickOnCell: true})
    }
  }

  const handleOnMouseUp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsMouseDown(false)
    if (event.button === 0) {
      if (gameStore.step === GameStep.NOT_STARTED) {

        setGameState( {
          step: GameStep.WAIT_TURN,
          field: FieldService.start(cl, gameStore.field),
          isClickOnCell: false }
        )
      }
      else if (gameStore.step === GameStep.WAIT_TURN || gameStore.isClickOnCell)

        setGameState((prevState) => {
          const field = FieldService.openOne(cl, prevState.field)
          const gameStep = GameService.getGameStepAfterOpened(cl, field)

          return { field, step: gameStep, isClickOnCell: false}
        })
    }
  }

  const handleRightClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setGameState({ ...gameStore, field: FieldService.changeOne(cl, gameStore.field)})
  }

  return { mouseDownState: isMouseDown, handleOnMouseDown, handleLeave, handleOnMouseUp, handleRightClick}
}
