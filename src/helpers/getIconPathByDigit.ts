
const getIconPathByDigit = (time: number, digitsCount: number): number[] => {

  const digits: number[] = []

  for (let i = 0; i < digitsCount; i++) {
    digits.push(Math.floor(time % 10))
    time = time / 10
  }

  return [...digits.reverse()]
}

export const getDigitPathByNumber = (time: number, digitsCount: number): string[] => {
  return getIconPathByDigit(time, digitsCount).map(digit => `/digit_icons/${digit}.png`)
}
