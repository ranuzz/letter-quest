import { Scene } from 'phaser'

export class GameOverScene extends Scene {

  start_msg: Phaser.GameObjects.Text
  answer: string

  constructor() {
    super('GameOverScene')
  }

  init(data: { answer: string }) {
    this.cameras.main.fadeIn(1000, 0, 0, 0)
    this.answer = data.answer
  }

  create() {
    // Background rectangles
    this.add
      .rectangle(0, this.scale.height / 2, this.scale.width, 120, 0xffffff)
      .setAlpha(0.8)
      .setOrigin(0, 0.5)
    this.add
      .rectangle(0, this.scale.height / 2 + 85, this.scale.width, 50, 0x000000)
      .setAlpha(0.8)
      .setOrigin(0, 0.5)

    // Logo
    const logo_game = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      'Game Over',
      {
        fontFamily: 'monospace',
        fontSize: 54,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center'
      }
    )
    logo_game.setOrigin(0.5, 0.5)
    logo_game.postFX.addShine()

    this.start_msg = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2 + 85,
        this.answer,
        {
          fontFamily: 'monospace',
          fontSize: 38,
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 8,
          align: 'center'
        }
      )
      .setOrigin(0.5, 0.5)

    // Tween to blink the text
    this.tweens.add({
      targets: this.start_msg,
      alpha: 0,
      duration: 800,
      ease: (value: number) => Math.abs(Math.round(value)),
      yoyo: true,
      repeat: -1
    })
  }
}

