import {GameStep} from "../api";

export const getSmileByGameStep = (smile: GameStep, isMouseDown: boolean) => {
  let fileName = ''

  switch (smile) {
    case GameStep.NOT_STARTED:
      fileName = 'smiling'
      break
    case GameStep.WAIT_TURN:
      fileName = 'smiling'
      break
    case GameStep.WON:
      fileName = 'winner'
      break
    case GameStep.LOST:
      fileName = 'loser'
      break
    case GameStep.CLICK_ON_CELL:
      fileName = 'scared'
      break
  }
  if (isMouseDown) fileName = 'smiling-click'

  return '/smile_icons/' + fileName + '.png'
}
