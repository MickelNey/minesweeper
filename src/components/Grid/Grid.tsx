import React from 'react'
import {useFieldContext} from "../../context";
import {Cell} from "../Cell/Cell";
import styles from './Grid.module.css'

export const Grid = () => {
  const { gameStore } = useFieldContext()

  return (
    <div className={styles.grid}>
      {gameStore.field.grid.map((row, i) =>
        row.map((cell, j ) =>
          <Cell cell={cell} cl={{ row: i, col: j}}/>))}
    </div>
  )
}