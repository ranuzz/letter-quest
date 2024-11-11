// Import Phaser types
import Phaser from 'phaser';
import { replaceCharacter } from '../helper';

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
        this.create(i * 64 + 32, 32 + 64 * (6 + j), 'alphabet-hidden')
      }
    }
  }

  reveal(deposited: string[]) {
    for (let i = 0; i < deposited.length; i++) {
      const [x, y] = this.getXY(deposited[i])
      console.log(x, y)
      if (x !== -1 && y !== -1) {
        this.create(32 + 64 * (y + 7), 32 + 64 * (x + 6), 'inner-garden')
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
}
