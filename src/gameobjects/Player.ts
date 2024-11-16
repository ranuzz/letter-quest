import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  direction: string = "up"
  health = 100
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 16, end: 19 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { start: 24, end: 27 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })
  }

  hit() {
    this.health -= 1
  }

  move(cursors?: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (cursors?.up?.isDown) {
      this.direction = "up"
      this.setVelocityY(-150)
      this.anims.play('up', true);
    }
    if (cursors?.down?.isDown) {
      this.direction = "down"
      this.setVelocityY(150)
      this.anims.play('down', true);
    }
    if (cursors?.right?.isDown) {
      this.direction = "right"
      this.setVelocityX(150)
      this.anims.play('right', true);
    }
    if (cursors?.left?.isDown) {
      this.direction = "left"
      this.setVelocityX(-150)
      this.anims.play('left', true);
    }
  }
}