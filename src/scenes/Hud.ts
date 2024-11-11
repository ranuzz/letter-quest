import { Scene } from 'phaser'

// The HUD scene is the scene that shows the points and the remaining time.
export class HudScene extends Scene {
  elapsed_time = 0

  remaining_time_text: Phaser.GameObjects.Text
  points_text: Phaser.GameObjects.Text
  deposited: number = 0

  constructor() {
    super('HudScene')
  }

  init(data: { game_time: number, deposited_count: number }) {
    this.cameras.main.fadeIn(1000, 0, 0, 0)
    this.elapsed_time = data.game_time
    this.deposited = data.deposited_count
  }

  create() {
    this.points_text = this.add.text(10, 10, `DEPOSITED:${this.deposited}`, {
      fontFamily: 'Arial Black',
      fontSize: 24,
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center'
    })
    this.remaining_time_text = this.add
      .text(this.scale.width - 10, 10, `REMAINING:${this.elapsed_time}s`, {
        fontFamily: 'Arial Black',
        fontSize: 24,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center'
      })
      .setOrigin(1, 0)
  }

  update_points(points: { toString: () => string }) {
    this.points_text.setText(`POINTS:${points.toString().padStart(4, '0')}`)
  }

  update_timeout(timeout: { toString: () => string }) {
    this.remaining_time_text.setText(
      `REMAINING:${timeout.toString().padStart(2, '0')}s`
    )
  }
}
