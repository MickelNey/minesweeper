import {GameStep} from "../api";

export const getSmileByGameStep = (smile: GameStep, isMouseOnSmileClick: boolean, isMouseCellClick: boolean = false) => {
  let fileName = ''

  switch (smile) {
    case GameStep.NOT_STARTED:
      fileName = 'smiling'
      break
    case GameStep.WAIT_TURN:
      fileName = isMouseCellClick ? 'scared' : 'smiling'
      break
    case GameStep.WON:
      fileName = 'winner'
      break
    case GameStep.LOST:
      fileName = 'loser'
      break
  }
  if (isMouseOnSmileClick) fileName = 'smiling-click'

  return '/smile_icons/' + fileName + '.png'
}
