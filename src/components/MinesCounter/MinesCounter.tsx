import React from 'react'
import {getDigitPathByDigits} from "../../helpers/getIconPathByDigit";
import {useFlagsCount} from "../../hooks";
import styles from './MinesCounter.module.scss'

export const MinesCounter = () => {
  const minesCount = useFlagsCount()

  return (
    <div className={styles.minesCounter}>
      {getDigitPathByDigits(minesCount, 3)
        .map(digit =>
          <img src={digit} alt={digit}/>)
      }
    </div>
  )
}
