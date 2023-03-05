import {useFieldContext} from "../context";

export const useFlagsCount = (): number => {
  const { gameStore } = useFieldContext()

  const count = gameStore.field.minesCount - gameStore.field.flagCount

  return count > 0 ? count : 0
}
