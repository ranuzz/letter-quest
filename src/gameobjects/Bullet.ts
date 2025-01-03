import Phaser from 'phaser'
import { GAME_WIDTH } from '../helper'

export default class Bullet extends Phaser.Physics.Arcade.Image {
  fire(x: number, y: number, direction: string) {
    this.disableBody(true, true)
    this.enableBody(true, x, y, true, true)
    let vx = 0, vy = -250
    switch (direction) {
      case "up":
        vx = 0
        vy = -250
        break
      case "down":
        vx = 0
        vy = 250
        break
      case "left":
        vx = -250
        vy = 0
        break
      case "right":
        vx = 250
        vy = 0
        break
      default:
        break
    }
    this.setVelocity(vx, vy)
  }

  fireEnemy(x: number, y: number, px: number, py: number, direction: string) {
    this.disableBody(true, true)
    this.enableBody(true, x, y, true, true)
    // console.log(direction)
    const v = this.calculateBulletVelocity(x, y, px, py, 100)
    this.setVelocity(v.velocityX, v.velocityY)
  }

  onCreate() {
    this.disableBody(true, true)
    this.setCollideWorldBounds(false)
    this.onWorldBounds()
  }

  onWorldBounds() {
    this.disableBody(true, true)
  }

  deactivateBullet() {
    if (this.y <= 0 || this.y >= GAME_WIDTH || this.x <= 0 || this.x >= GAME_WIDTH) {
      this.onWorldBounds()
    }
  }

  calculateBulletVelocity(x1: number, y1: number, x2: number, y2: number, speed: number) {
    // Calculate differences in x and y
    const dx = x2 - x1;
    const dy = y2 - y1;

    // Calculate the distance between the source and destination
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Normalize the direction and scale it by the speed
    const velocityX = (dx / distance) * speed;
    const velocityY = (dy / distance) * speed;

    return { velocityX, velocityY };
  }
}