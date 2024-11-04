/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Scene } from 'phaser'

const MAX_LEVEL_TIME = 300

export class ArenaScene extends Scene {
  game_time = 0
  points = 0
  current_level = 1
  cursors = null
  player = null
  constructor() {
    super('ArenaScene')
  }

  init() {
    this.cameras.main.fadeIn(1000, 0, 0, 0)
    this.scene.launch('MenuScene')

    // Reset points
    this.points = 0
    this.game_time = 0
  }

  // preload ()
  // {
  //     this.load.setPath('assets');
  //     this.load.image('background', 'bg.png');
  //     this.load.image('logo', 'logo.png');
  // }

  create() {
    this.game.events.on('start-game', () => {
      this.scene.stop('MenuScene')
      this.scene.launch('HudScene', { remaining_time: this.game_time })

      // this.add.image(0, 0, 'background')
      // this.add.image(512, 350, 'logo').setDepth(100)
      // this.add
      //   .text(512, 490, 'Letter Quest', {
      //     fontFamily: 'Arial Black',
      //     fontSize: 38,
      //     color: '#ffffff',
      //     stroke: '#000000',
      //     strokeThickness: 8,
      //     align: 'center'
      //   })
      //   .setOrigin(0.5)
      //   .setDepth(100)

      const platforms = this.physics.add.staticGroup()

      // Arena wall with gates
      for (let i = 0; i < 20; i++) {
        if (i !== 9 && i !== 10) {
          platforms.create(i * 64 + 32, 32, 'rigid-block')
        }
      }
      for (let i = 0; i < 20; i++) {
        if (i !== 9 && i !== 10) {
          platforms.create(i * 64 + 32, 1024 - 32, 'rigid-block')
        }
      }
      for (let i = 1; i < 15; i++) {
        if (i !== 7 && i != 8) {
          platforms.create(32, 32 + i * 64, 'rigid-block')
        }
      }
      for (let i = 1; i < 15; i++) {
        if (i !== 7 && i != 8) {
          platforms.create(1280 - 32, 32 + i * 64, 'rigid-block')
        }
      }

      // Arena spawn zone with gates
      for (let i = 5; i < 15; i++) {
        if (i !== 9 && i !== 10) {
          platforms.create(i * 64 + 32, 32 + 64 * 4, 'rigid-block')
        }
      }
      for (let i = 5; i < 15; i++) {
        if (i !== 9 && i !== 10) {
          platforms.create(i * 64 + 32, 1024 - (32 + 64 * 4), 'rigid-block')
        }
      }
      for (let i = 5; i < 11; i++) {
        if (i !== 7 && i != 8) {
          platforms.create(32 + 64 * 5, 32 + i * 64, 'rigid-block')
        }
      }
      for (let i = 5; i < 11; i++) {
        if (i !== 7 && i != 8) {
          platforms.create(1280 - (32 + 64 * 5), 32 + i * 64, 'rigid-block')
        }
      }

      // Inner garden
      for (let i = 6; i < 14; i++) {
        platforms.create(i * 64 + 32, 32 + 64 * 5, 'inner-garden')
      }
      for (let i = 6; i < 14; i++) {
        platforms.create(i * 64 + 32, 1024 - (32 + 64 * 5), 'inner-garden')
      }
      for (let i = 6; i < 10; i++) {
        platforms.create(32 + 64 * 6, 32 + i * 64, 'inner-garden')
      }
      for (let i = 6; i < 10; i++) {
        platforms.create(1280 - (32 + 64 * 6), 32 + i * 64, 'inner-garden')
      }

      // alphabet hidden
      for (let j = 0; j < 4; j++) {
        for (let i = 7; i < 13; i++) {
          platforms.create(i * 64 + 32, 32 + 64 * (6 + j), 'alphabet-hidden')
        }
      }

      const playerFront = this.add
        .image(1280 / 2, 1024 / 2, 'player-front')
        .setDepth(100)
      const playerFrontPhys = this.physics.add.existing(playerFront)
      // @ts-ignore
      this.player = playerFrontPhys

      // Cursor keys
      // @ts-ignore
      this.cursors = this.input.keyboard.createCursorKeys()

      // Game Over timeout
      this.time.addEvent({
        delay: 1000,
        loop: true,
        callback: () => {
          if (this.game_time >= MAX_LEVEL_TIME) {
            // You need remove the event listener to avoid duplicate events.
            this.game.events.removeListener('start-game')
            // It is necessary to stop the scenes launched in parallel.
            this.scene.stop('HudScene')
            // this.scene.start("GameOverScene", { points: this.points });
          } else {
            this.game_time++
            // @ts-ignore
            this.scene.get('HudScene').update_timeout(this.game_time)
          }
        }
      })
    })
  }

  update() {
    // @ts-ignore
    if (this.cursors?.up?.isDown) {
      // @ts-ignore
      this.player.y -= 5
    }
    // @ts-ignore
    if (this.cursors?.down?.isDown) {
      // @ts-ignore
      this.player.y += 5
    }
    // @ts-ignore
    if (this.cursors?.right?.isDown) {
      // @ts-ignore
      this.player.x += 5
    }
    // @ts-ignore
    if (this.cursors?.left?.isDown) {
      // @ts-ignore
      this.player.x -= 5
    }
  }
}
