import Phaser from 'phaser'
import { getStartPixel } from '../helper'

export default class Alphabet extends Phaser.Physics.Arcade.Sprite {

  disappearTimer = 50000
  char: string
  onCreate() {
    this.disappearTimer = 50000
    this.disableBody(true, true)
    this.setCollideWorldBounds(true)
    this.onWorldBounds()
  }

  spawn(x: number, y: number, char: string) {
    this.disappearTimer = 50000
    this.char = char
    const pixel = getStartPixel(char)
    this.setFrame(pixel)
    this.disableBody(true, true)
    this.enableBody(true, x, y, true, true)
  }
  onWorldBounds() {
    this.disableBody(true, true)
    this.disappearTimer = 50000
  }

  deactivateAlphabet() {
    if (this.disappearTimer <= 0) {
      this.onWorldBounds()
    } else {
      this.disappearTimer -= 50
    }
  }
}