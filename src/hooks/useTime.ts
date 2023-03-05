import {useEffect, useState} from "react";
import {useGameContext} from "./useGameContext";
import {GameStep} from "../api";

export const useTime = () => {
  const [time, setTime] = useState(0)

  const { gameStore } = useGameContext()

  useEffect(() => {
    if (gameStore.step === GameStep.WAIT_TURN && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1)
      }, 1000)

      return () => {
        clearInterval(timer)
      }
    }
    if (gameStore.step === GameStep.NOT_STARTED) setTime(0)

  }, [time, gameStore.step])

  return time
}
