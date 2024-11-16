import Phaser from 'phaser'
import Bullets from './Bullets'

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
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
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('enemy', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('enemy', { start: 16, end: 19 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('enemy', { start: 24, end: 27 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.play('up', true);
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
      if (this.y < y + (32 * 10)) {
        this.anims.play('up', true);
      } else if (this.y > y + (32 * 10)) {
        this.anims.play('down', true);
      } else if (this.x < x) {
        this.anims.play('right', true);
      } else {
        this.anims.play('left', true);
      }
    } else {
      this.fireFrequency -= 50
    }
  }
}