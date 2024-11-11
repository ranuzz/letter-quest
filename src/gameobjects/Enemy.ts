import Phaser from 'phaser'
import Bullets from './Bullets'

export default class Enemy extends Phaser.Physics.Arcade.Image {
  health: number = 100
  fireFrequency: number = 0
  spawn(x: number, y: number) {
    this.health = 100
    this.disableBody(true, true)
    this.enableBody(true, x, y, true, true)
  }

  hit() {
    this.health -= 50
  }

  onCreate() {
    this.disableBody(true, true)
    this.setCollideWorldBounds(true)
    this.onWorldBounds()
    this.health = 100
  }

  onWorldBounds() {
    this.disableBody(true, true)
  }

  die() {
    if (this.health <= 0) {
      this.onWorldBounds()
    }
  }

  fire(x: number, y: number, direction: string, bullets: Bullets) {
    if (this.active && bullets && this.fireFrequency <= 0) {
      this.fireFrequency = 5000
      bullets.fireEnemy(this.x, this.y, x, y, direction)
    } else {
      this.fireFrequency -= 50
    }
  }
}