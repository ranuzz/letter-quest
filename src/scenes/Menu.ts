import { Scene } from 'phaser'

export class MenuScene extends Scene {
  constructor() {
    super('MenuScene')
  }

  init() {
    this.cameras.main.fadeIn(1000, 0, 0, 0)
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
      'Letter Quest',
      {
        fontFamily: 'Arial Black',
        fontSize: 54,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center'
      }
    )
    logo_game.setOrigin(0.5, 0.5)
    logo_game.postFX.addShine()

    const start_msg = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2 + 85,
        'CLICK TO START',
        {
          fontFamily: 'Arial Black',
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
      targets: start_msg,
      alpha: 0,
      duration: 800,
      ease: (value: number) => Math.abs(Math.round(value)),
      yoyo: true,
      repeat: -1
    })

    // Send start-game event when user clicks
    this.input.on('pointerdown', () => {
      this.game.events.emit('start-game')
    })
  }
}

