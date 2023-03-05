import React from 'react'
import type {CellLocation, ICell} from 'api'
import styles from './Cell.module.css'
import {getIconPathByCell} from '../../helpers/getIconPathByCell'
import {useCellHandlers} from "../../hooks";

interface CellProps {
  cell: ICell
  cl: CellLocation
}

export const Cell = ({cell, cl}: CellProps) => {
  const { mouseDownState, handleOnMouseDown, handleLeave, handleOnMouseUp, handleRightClick} = useCellHandlers(cl)

  return (
    <button className={styles.cell}
         onMouseDown={handleOnMouseDown}
         onMouseUp={handleOnMouseUp}
         onMouseLeave={handleLeave}
         onContextMenu={handleRightClick}
    >
        <img className={styles.img} src={getIconPathByCell(cell, mouseDownState)} alt='0'></img>
    </button>
  )
}
