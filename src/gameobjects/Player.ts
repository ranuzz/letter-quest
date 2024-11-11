import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  direction: string = "up"
  health = 100000000
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player-front')
    scene.add.existing(this)
    scene.physics.add.existing(this)
  }

  hit() {
    this.health -= 10
    console.log(this.health)
  }

  move(cursors?: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (cursors?.up?.isDown) {
      this.direction = "up"
      this.setVelocityY(-300)
    }
    if (cursors?.down?.isDown) {
      this.direction = "down"
      this.setVelocityY(300)
    }
    if (cursors?.right?.isDown) {
      this.direction = "right"
      this.setVelocityX(300)
    }
    if (cursors?.left?.isDown) {
      this.direction = "left"
      this.setVelocityX(-300)
    }
  }
}