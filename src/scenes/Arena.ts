import { Scene } from 'phaser'

const MAX_LEVEL_TIME = 300

export class ArenaScene extends Scene {
  game_time = 0
  points = 0
  current_level = 1
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

      this.add.image(1024, 1024, 'background')
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
      platforms.create(0, 0, 'rigid-block')

      const logo = this.add.image(512, 350, 'logo').setDepth(100)
      const logoPhys = this.physics.add.existing(logo)

      const keyObject = this.input?.keyboard?.addKey('W') // Get key object
      keyObject?.on('down', function (event: KeyboardEvent) {
        /* ... */
        console.log(event)
        logoPhys.y -= 5
      })
      keyObject?.on('up', function (event: KeyboardEvent) {
        /* ... */
        console.log(event)
      })

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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.scene.get('HudScene').update_timeout(this.game_time)
          }
        }
      })
    })
  }
}
