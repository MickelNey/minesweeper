import {FieldService, GameStep} from "../api";
import {GameStore} from "./GameContext";

export const getInitial = (
  rows = 16,
  cols = 16,
  minesCount = 40): GameStore => {

  return  {
    field: {
      rows,
      cols,
      minesCount,
      grid: FieldService._createGrid(rows, cols),
      openedCells: 0,
      flagCount: 0
    },
    isClickOnCell: false,
    step: GameStep.NOT_STARTED
  }

}
