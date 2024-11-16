export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFromArray(arr: any[]) {
  return arr[getRandomInt(0, arr.length - 1)]
}

export const fruits = ['Apple', 'Banana', 'Cherry', 'Damson', 'Date', 'Durian', 'Feijoa', 'Fig', 'Grape', 'Raisin', 'Guava', 'Jambul', 'Jujube', 'Kiwano', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Melon', 'Nance', 'Olive', 'Orange', 'Papaya', 'Peach', 'Pear', 'Plum', 'Prune', 'Pomelo', 'Quince', 'Salak', 'Yuzu',]

export const allAlphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export function createCrosswordPuzzle(fruit: string) {
  const puzzle: string[] = []
  for (let i = 0; i < 4; i++) {
    if (i === 2) {
      while (fruit.length < 6) {
        fruit += (getRandomFromArray(allAlphabets) as string).toUpperCase()
      }
      puzzle.push(fruit)
    } else {
      let word = ''
      while (word.length < 6) {
        word += (getRandomFromArray(allAlphabets) as string).toUpperCase()
      }
      puzzle.push(word)
    }
  }
  return puzzle
}

export function replaceCharacter(str: string, index: number, newChar: string) {
  if (index < 0 || index >= str.length) {
    return str; // Return the original string if index is out of bounds
  }
  // Create a new string with the character replaced
  return str.slice(0, index) + newChar + str.slice(index + 1);
}

export function getStartPixel(char: string) {
  const i = allAlphabets.indexOf(char)
  if (i !== -1) {
    return i
  } else {
    return 0
  }
}

export const TILE_SIZE = 32
export const TILE_CENTER = 16
export const GAME_WIDTH = 32 * 20
export const GAME_HEIGHT = 32 * 16 
