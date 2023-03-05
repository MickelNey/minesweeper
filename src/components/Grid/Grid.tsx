import React from 'react'
import {useGameContext} from "../../hooks";
import {Cell} from "../Cell/Cell";
import styles from './Grid.module.css'

export const Grid = () => {
  const { gameStore } = useGameContext()

  return (
    <div className={styles.grid}>
      {gameStore.field.grid.map((row, i) =>
        row.map((cell, j ) =>
          <Cell cell={cell} cl={{ row: i, col: j}}/>))}
    </div>
  )
}
