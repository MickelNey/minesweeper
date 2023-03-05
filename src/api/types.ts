export enum CellState {
  HIDDEN = 'hidden',
  RED_MINE = 'red-mine',
  FLAG= 'flag',
  QUESTION = 'question',
  ERROR_FLAG = 'error-flag',
  MINE = 'mine',
  NOT_MINE = 'empty',
}

export interface ICell {
  state: CellState
  isMine: boolean
  minesAround: number
}

export interface CellLocation {
  row: number
  col: number
}

export type GridType = ICell[][]

export interface IField {
  rows: number
  cols: number
  grid: GridType
  minesCount: number
  flagCount: number
  openedCells: number
}

export enum GameStep {
  NOT_STARTED,
  WAIT_TURN,
  CLICK_ON_CELL,
  LOST,
  WON
}


