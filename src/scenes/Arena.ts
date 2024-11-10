import { Scene } from 'phaser'
import Wall from '../gameobjects/Wall'
import Garden from '../gameobjects/Graden'
import CrossWord from '../gameobjects/CrossWord'
import Player from '../gameobjects/Player'

const MAX_LEVEL_TIME = 300

export class ArenaScene extends Scene {
  game_time = 0
  points = 0
  current_level = 1
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  wallGroup: Wall | undefined
  innerGarden: Garden | undefined
  crossWord: CrossWord | undefined
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | Player | undefined

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


  create() {
    this.game.events.on('start-game', () => {
      this.scene.stop('MenuScene')
      this.scene.launch('HudScene', { remaining_time: this.game_time })
      this.cursors = this.input.keyboard?.createCursorKeys()
      this.physics.world.createDebugGraphic();
      this.physics.world.debugGraphic.visible = true;
      this.createLevel()

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

  createLevel() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    this.wallGroup = new Wall(this)
    this.wallGroup.addWall()
    this.innerGarden = new Garden(this)
    this.innerGarden.addGardern()
    this.crossWord = new CrossWord(this)
    this.crossWord.addCrossWord()
    this.player = new Player(this, centerX, centerY) // this.physics.add.sprite(centerX, centerY, 'player-front')
    this.physics.add.collider(this.player, this.wallGroup)
  }

  update() {
    if (this.cursors?.up?.isDown) {
        this.player?.setVelocityY(-200)
    }
    if (this.cursors?.down?.isDown) {
      this.player?.setVelocityY(200)
    }
    if (this.cursors?.right?.isDown) {
      this.player?.setVelocityX(200)
    }
    if (this.cursors?.left?.isDown) {
      this.player?.setVelocityX(-200)
    }
    this.wallGroup?.refresh()
  }
}
