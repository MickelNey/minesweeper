import {CellState, ICell} from "../api";

export const getIconPathByCell = (cell: ICell, isMouseDown: boolean) => {
  let iconName: string = cell.state

  if (cell.state === CellState.QUESTION && isMouseDown) {
    iconName = 'click-question'
  }
  if (cell.state === CellState.HIDDEN && isMouseDown) {
    iconName = 'empty'
  }
  if (cell.state === CellState.NOT_MINE) {
    if (cell.minesAround === 0) {
      iconName = 'empty'
    }
    else {
      iconName = cell.minesAround.toString()
    }
  }

  return '/cell_icons/' + iconName + '.png'
}
