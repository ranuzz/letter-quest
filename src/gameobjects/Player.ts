import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player-front')
        scene.add.existing(this)
        scene.physics.add.existing(this)
    }

    move(cursors?: Phaser.Types.Input.Keyboard.CursorKeys) {
        if (cursors?.up?.isDown) {
            this.setVelocityY(-200)
        }
        if (cursors?.down?.isDown) {
          this.setVelocityY(200)
        }
        if (cursors?.right?.isDown) {
          this.setVelocityX(200)
        }
        if (cursors?.left?.isDown) {
          this.setVelocityX(-200)
        }
    }
}