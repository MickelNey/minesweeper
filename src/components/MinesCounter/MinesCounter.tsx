import React from 'react'
import {getDigitPathByNumber} from "../../helpers/getIconPathByDigit";
import {useFlagsCount} from "../../hooks";
import styles from './MinesCounter.module.css'

export const MinesCounter = () => {
  const minesCount = useFlagsCount()

  return (
    <div className={styles.minesCounter}>
      {getDigitPathByNumber(minesCount, 3)
        .map(digit =>
          <img src={digit} alt={digit}/>)
      }
    </div>
  )
}
