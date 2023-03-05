import {CellLocation, CellState, GridType, ICell, IField} from "./types";

export class FieldService {
  static _createGrid(rows: number, cols: number): GridType {
    const grid: GridType = new Array(rows)

    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols)
      for (let j = 0; j < cols; j++) {
        grid[i][j] = {
          state: CellState.HIDDEN,
          isMine: false,
          minesAround: 0
        }
      }
    }

    return grid
  }

  static start(start: CellLocation, field: IField): IField {

    const { rows, cols, minesCount } = JSON.parse(JSON.stringify(field))

    const grid = this._createGrid(rows, cols)

    let count = 0
    while (count < minesCount) {
      const row = Math.floor(Math.random() * rows)
      const col = Math.floor(Math.random() * cols)

      if (start.col === col && start.row === row) continue

      if (grid[row][col].isMine) continue

      grid[row][col].isMine = true

      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (j === 0 && i === 0) continue

          if (this._checkOnBorder({row: row + i, col: col + j}, rows, cols))
            grid[row + i][col + j].minesAround++
        }
      }
      count++
    }

    return this.openOne(start,{ ...field, grid: grid, flagCount: 0})

  }

  static openOne(cl: CellLocation, field: IField): IField {
    const { grid, rows, cols, openedCells, minesCount } = JSON.parse(JSON.stringify(field))

    if (grid[cl.row][cl.col].state === CellState.HIDDEN) {
      let res = this._openCell(cl, rows, cols, grid, openedCells)

      if (this._isWon(res.openedCells, minesCount, rows, cols))
        res.grid = this._setAllFlags(cl, rows, cols, res.grid)

      return {
        ...field,
        grid: res.grid,
        openedCells: res.openedCells
      }
    }
    else return { ...field }
  }

  static _openCell(
    cl: CellLocation,
    rows: number,
    cols: number,
    grid: GridType,
    cellsWithoutMines: number): { grid: GridType, isMine: boolean, openedCells: number}
  {
    let gridCopy: GridType = JSON.parse(JSON.stringify(grid))
    let isMine = false

    if (gridCopy[cl.row][cl.col].isMine) {
      gridCopy[cl.row][cl.col].state = CellState.RED_MINE
      gridCopy = this._openAllMines(cl, rows, cols, gridCopy)
      isMine = true
    }
    else {
      const res = this._openAround(cl, rows, cols, gridCopy)
      gridCopy = res.grid
      cellsWithoutMines += res.openCount
    }

    return {
      grid: gridCopy,
      isMine: isMine,
      openedCells: cellsWithoutMines }
  }

  static _openAround(
    cl: CellLocation,
    rows: number,
    cols: number,
    grid: GridType,
    explored: Set<string> = new Set()
  ): { grid: GridType, openCount: number} {

    let gridCopy: GridType = JSON.parse(JSON.stringify(grid))

    gridCopy[cl.row][cl.col].state = CellState.NOT_MINE

    explored.add(`${cl.row}:${cl.col}`)

    if (gridCopy[cl.row][cl.col].minesAround === 0) {
      const lws = this._successorsAround(cl, rows, cols, gridCopy)

      for (let i = 0; i < lws.length; i++) {

          const res = this._openAround(lws[i], rows, cols, gridCopy, explored)
          gridCopy = JSON.parse(JSON.stringify(res.grid))
        }
      }

    return { grid: gridCopy, openCount: explored.size}
  }

  static _openAllMines(cl: CellLocation, rows: number, cols: number, grid: GridType): GridType {
    let gridCopy: GridType = JSON.parse(JSON.stringify(grid))

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = gridCopy[i][j]

        if (cell.isMine && cell.state === CellState.HIDDEN)
          cell.state = CellState.MINE

        if (!cell.isMine && cell.state === CellState.FLAG)
          cell.state = CellState.ERROR_FLAG


        gridCopy[i][j] = cell
      }
    }

    return gridCopy

  }

  static _setAllFlags(cl: CellLocation, rows: number, cols: number, grid: GridType): GridType {
    let gridCopy: GridType = JSON.parse(JSON.stringify(grid))

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {

        const cell = gridCopy[i][j]

        if (cell.isMine) cell.state = CellState.FLAG
        gridCopy[i][j] = cell
      }
    }

    return gridCopy
  }
  static _successorsAround(cl: CellLocation, rows: number, cols: number, grid: GridType): CellLocation[] {
    const locationsWithoutMines: CellLocation[] = []
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (j === 0 && i === 0) continue

        const row = cl.row + i
        const col = cl.col + j
        if (
          this._checkOnBorder({row, col}, rows, cols) &&
          !grid[row][col].isMine &&
          grid[row][col].state === CellState.HIDDEN
        ) {
          locationsWithoutMines.push({row, col})
        }
      }
    }
    return [...locationsWithoutMines]
  }

  static _isWon(openedCells: number, minesCount: number, rows: number, cols: number): boolean {
    return openedCells === (rows * cols) - minesCount
  }

  static changeOne(cl: CellLocation, field: IField): IField {
    const cellCopy: ICell = JSON.parse(JSON.stringify(field.grid[cl.row][cl.col]))
    let res = { cell: cellCopy, flagCount: field.flagCount}

    switch (field.grid[cl.row][cl.col].state) {
      case CellState.HIDDEN:
        res = this._flagCell(cellCopy, field.flagCount)
        break
      case CellState.FLAG:
        res = this._removeFlag(cellCopy, field.flagCount)
        break
      case CellState.QUESTION:
        res = this._hiddenCell(cellCopy, field.flagCount)
        break
    }

    field.grid[cl.row][cl.col] = res.cell

    return { ...field, flagCount: res.flagCount }
  }
  static _flagCell(cell: ICell, flagCount: number): { cell: ICell, flagCount: number}  {
    return { flagCount: flagCount + 1, cell: {...cell, state: CellState.FLAG}}
  }
  static _removeFlag(cell: ICell, flagCount: number): { cell: ICell, flagCount: number} {
    cell.state = CellState.QUESTION
    return { flagCount: flagCount - 1, cell }
  }
  static _hiddenCell(cell: ICell, flagCount: number): { cell: ICell, flagCount: number} {
    cell.state = CellState.HIDDEN
    return { flagCount, cell }
  }

  static clearField(field: IField): IField {
    const grid = this._createGrid(field.rows, field.cols)
    return { ...field, grid: grid, flagCount: 0, openedCells: 0}
  }


  static _checkOnBorder(cl: CellLocation, rows: number, cols: number): boolean {
    return !(cl.row < 0 || cl.row > rows - 1 || cl.col < 0 || cl.col > cols - 1)
  }
}
