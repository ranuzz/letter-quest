// Import Phaser types
import Phaser from 'phaser';
import { getStartPixel, replaceCharacter, TILE_CENTER, TILE_SIZE } from '../helper';

export default class CrossWord extends Phaser.Physics.Arcade.Group {

  answer: string
  crossword: string[] = []

  constructor(scene: Phaser.Scene, puzzle: string[], fruit: string) {
    super(scene.physics.world, scene)
    this.crossword = puzzle
    this.answer = fruit
  }

  addCrossWord() {
    // alphabet hidden
    for (let j = 0; j < 4; j++) {
      for (let i = 7; i < 13; i++) {
        this.create(i * TILE_SIZE + TILE_CENTER, TILE_CENTER + TILE_SIZE * (6 + j), 'hidden')
      }
    }
  }

  reveal(deposited: string[]) {
    for (let i = 0; i < deposited.length; i++) {
      const [x, y] = this.getXY(deposited[i])
      const pixel = getStartPixel(deposited[i])
      // console.log(x, y)
      if (x !== -1 && y !== -1) {
        this.create(TILE_CENTER + TILE_SIZE * (y + 7), TILE_CENTER + TILE_SIZE * (x + 6), 'alphabet', pixel)
      }
    }
  }

  getXY(char: string) {
    let x = -1, y = -1
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 6; j++) {
        if (this.crossword[i][j] === char && i !== -1 && j !== -1) {
          x = i
          y = j
        }
      }
    }

    if (x !== -1 && y !== -1) {
      this.crossword[x] = replaceCharacter(this.crossword[x], y, "*")
    }

    return [x, y]
  }

  isRevealed() {
    let result = true
    for (let i = 0; i < this.crossword.length; i++) {
      for (let j = 0; j < this.crossword[i].length; j++) {
        if (this.crossword[i][j] !== "*") {
          result = false
        }
      }
    }
    return result
  }
}
