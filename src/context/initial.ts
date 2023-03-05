import {FieldService, GameStep} from "../api";
import {GameStore} from "./FieldContext";

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
    step: GameStep.NOT_STARTED
  }

}
