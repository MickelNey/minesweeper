import {useContext} from "react";
import {FieldContext, GameStore} from "./FieldContext";

export const useFieldContext = () => {
  const gameContext = useContext(FieldContext)

  return {
    ...gameContext
  }
}
