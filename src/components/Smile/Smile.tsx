import React from "react";
import {getSmileByGameStep} from "../../helpers/getSmileByGameStep";
import {useFieldContext} from "../../context";
import {useSmileHandlers} from "../../hooks";
import styles from './Smile.module.scss'

export const Smile = () => {
  const { gameStore } = useFieldContext()

  const { handleOnMouseLeave, handleOnMouseDown, handleOnMouseUp, isMouseDown} = useSmileHandlers()

  return (
    <button className={styles.smile}
      onMouseUp={handleOnMouseUp}
      onMouseDown={handleOnMouseDown}
      onMouseLeave={handleOnMouseLeave}
    >
      <img src={getSmileByGameStep(gameStore.step, isMouseDown)} alt={'smile'}/>
    </button>
  )
}

