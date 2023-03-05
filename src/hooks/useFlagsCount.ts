import {useGameContext} from "./useGameContext";

export const useFlagsCount = (): number => {
  const { gameStore } = useGameContext()

  const count = gameStore.field.minesCount - gameStore.field.flagCount

  return count > 0 ? count : 0
}
