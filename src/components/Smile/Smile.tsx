import React from "react";
import {getSmileByGameStep} from "../../helpers/getSmileByGameStep";
import {useSmileHandlers, useGameContext} from "../../hooks";
import styles from './Smile.module.css'

export const Smile = () => {
  const { gameStore } = useGameContext()

  const { handleOnMouseLeave, handleOnMouseDown, handleOnMouseUp, isMouseDown} = useSmileHandlers()

  return (
    <button className={styles.smile}
      onMouseUp={handleOnMouseUp}
      onMouseDown={handleOnMouseDown}
      onMouseLeave={handleOnMouseLeave}
    >
      <img src={getSmileByGameStep(gameStore.step, isMouseDown, gameStore.isClickOnCell)} alt={'smile'}/>
    </button>
  )
}

