import Phaser from 'phaser'

export default class Enemy extends Phaser.Physics.Arcade.Image {
  health: number = 100
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
}