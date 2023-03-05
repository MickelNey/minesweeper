import {getDigitPathByDigits} from "../../helpers/getIconPathByDigit";
import styles from './Timer.module.css'
import {useTime} from "../../hooks";

export const Timer = () => {
  const time = useTime()

  return (
    <div className={styles.timer}>
      {getDigitPathByDigits(time, 3)
        .map(digit =>
        <img src={digit} alt={digit}/>)
      }
    </div>
  )
}
