export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFromArray(arr: any[]) {
  return arr[getRandomInt(0, arr.length - 1)]
}