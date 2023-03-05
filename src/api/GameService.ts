import {CellLocation, IField, GameStep} from "./types";
import {FieldService} from "./FieldService";

export class GameService {
  static getGameStepAfterOpened(cl: CellLocation, field: IField): GameStep {
    if (field.grid[cl.row][cl.col].isMine)
      return GameStep.LOST

    if (FieldService._isWon(field.openedCells, field.minesCount, field.rows, field.cols))
      return GameStep.WON

    return GameStep.WAIT_TURN
  }
}
