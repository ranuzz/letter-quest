import { Scene } from 'phaser'
import Wall from '../gameobjects/Wall'
import Garden from '../gameobjects/Graden'
import CrossWord from '../gameobjects/CrossWord'
import Player from '../gameobjects/Player'
import Bullets from '../gameobjects/Bullets'
import Enemies from '../gameobjects/Enemies'
import { createCrosswordPuzzle, fruits, GAME_HEIGHT, GAME_WIDTH, getRandomFromArray, TILE_SIZE } from '../helper'
import Enemy from '../gameobjects/Enemy'
import Bullet from '../gameobjects/Bullet'
import Alphabets from '../gameobjects/Alphabets'
import Alphabet from '../gameobjects/Alphabet'

const MAX_ENEMIES = 5

export class ArenaScene extends Scene {
  game_time = 0
  points = 0
  current_level = 1
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  wallGroup: Wall | undefined
  innerGarden: Garden | undefined
  crossWord: CrossWord | undefined
  player: Player | undefined
  bullets: Bullets | undefined
  enemyBullets: Bullets
  inputKeys: Phaser.Input.Keyboard.Key[] | any[]
  enemies: Enemies | undefined
  enemy_ys: number[] = [64, 64 + TILE_SIZE, GAME_HEIGHT - 64, GAME_HEIGHT - (64 * 2)]
  enemy_xs: number[] = [64, 128, GAME_WIDTH - 64, GAME_WIDTH - 128]
  enemy_positions: { x: number, y: number }[] = []
  overlapAdded = false
  alphabets: Alphabets
  collected: string[] = []
  toCollect: string[] = []
  deposited: string[] = []
  fruit: string
  puzzle: string[]

  constructor() {
    super('ArenaScene')
  }

  init() {
    this.cameras.main.fadeIn(1000, 0, 0, 0)
    this.scene.launch('MenuScene')
    this.game_time = 0
    for (let i = 2; i < 12; i++) {
      this.enemy_ys.push(i * TILE_SIZE)
    }
    this.fruit = getRandomFromArray(fruits) as string
    this.puzzle = createCrosswordPuzzle(this.fruit.toUpperCase())
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 6; j++) {
        this.toCollect.push(this.puzzle[i][j])
      }
    }
  }


  create() {
    this.game.events.on('start-game', () => {
      this.scene.stop('MenuScene')
      this.scene.launch('HudScene', { remaining_time: this.game_time, deposited_count: this.deposited.length })
      this.cursors = this.input.keyboard?.createCursorKeys()
      this.physics.world.on('worldbounds', (body: any) => {
        body.gameObject.onWorldBounds();
      });
      this.createLevel()

      this.time.addEvent({
        delay: 1000,
        loop: true,
        callback: () => {
          const playerHealth = this.player ? this.player.health : 100
          if (this.crossWord?.isRevealed() || playerHealth <= 0) {
            this.game.events.removeListener('start-game')
            this.scene.stop('HudScene')
            this.scene.start("GameOverScene", { answer: playerHealth > 0 ? `Secret: ${this.fruit}` : 'DEAD!!!' });
          } else {
            this.game_time++
            // @ts-ignore
            this.scene.get('HudScene').update_timeout(this.game_time)
            // @ts-ignore
            this.scene.get('HudScene').update_points(this.player?.health || 100)
          }
        }
      })


      this.time.addEvent({
        delay: 2000,
        loop: true,
        callback: () => {
          const curEnemies = this.enemies?.activeCount() || 0
          if (curEnemies < MAX_ENEMIES) {
            let x, y
            let isUsed = false
            do {
              isUsed = false
              x = getRandomFromArray(this.enemy_xs)
              y = getRandomFromArray(this.enemy_ys)

              for (let i = 0; i < this.enemy_positions.length; i++) {
                const ep = this.enemy_positions[i]
                if (ep.x === x && ep.y === y) {
                  isUsed = true
                }
              }
            } while (isUsed)
            this.enemy_positions.push({ x, y })
            this.enemies?.spawn(x, y)
          }
        }
      })

    })
  }

  createLevel() {
    this.add.image(0, 0, 'background').setOrigin(0, 0)
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    this.wallGroup = new Wall(this)
    this.wallGroup.addWall()
    this.innerGarden = new Garden(this)
    this.innerGarden.addGardern()
    this.crossWord = new CrossWord(this, this.puzzle, this.fruit)
    this.crossWord.addCrossWord()
    this.player = new Player(this, centerX, centerY)
    this.physics.add.collider(this.player, this.wallGroup)
    this.bullets = new Bullets(this, { name: 'bullets' }, 'player-bullet')
    this.enemyBullets = new Bullets(this, { name: 'enemy-bullets' }, 'enemy-bullet')
    this.enemies = new Enemies(this, { name: 'enemies' }, this.bullets)
    this.alphabets = new Alphabets(this, { name: 'alphabets' })
    this.input.on('pointerdown', () => {
      this.bullets?.fire(this.player?.body?.x || 0, this.player?.body?.y || 0, this.player?.direction || "down");
    });
    this.inputKeys = [
      this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    ];

  }

  update() {
    this.player?.move(this.cursors)
    this.wallGroup?.refresh()
    this.inputKeys?.forEach(key => {
      if (Phaser.Input.Keyboard.JustDown(key)) {
        this.bullets?.fire(this.player?.body?.x || 0, this.player?.body?.y || 0, this.player?.direction || "down");
        this.sound.play('fire')
      }
    });
    this.bullets?.deactivateBullets()
    this.enemyBullets?.deactivateBullets()
    this.enemies?.killEnemies()
    this.alphabets?.deactivateAlphabets()
    this.enemies?.fire(this.player?.body?.x || 0, this.player?.body?.y || 0, this.player?.direction || "down", this.enemyBullets)

    if (this.enemies && this.bullets && this.enemies.children.entries.length === 5) {
      this.enemies?.getChildren().forEach(child => {
        const enemy = child as Enemy
        this.physics.overlap(enemy, this.bullets, (enemy, bullet) => {
          const b = bullet as Bullet
          const e = enemy as Enemy
          if (b && e) {
            b.onWorldBounds()
            e.hit()
            if (e.health === 0 && e.body?.x && e.body?.y && this.toCollect.length >= 1) {
              this.alphabets.spawn(e.body.x, e.body.y, getRandomFromArray(this.toCollect))
            }
          }
        })
      });
    }

    if (this.player && this.enemyBullets) {
      this.physics.overlap(this.player, this.enemyBullets, (p, bullet) => {
        const b = bullet as Bullet
        const c = p as Player
        if (b && c) {
          b.onWorldBounds()
          c.hit()
        }
      })
    }


    if (this.player && this.alphabets) {
      this.physics.overlap(this.player, this.alphabets, (player, alphabet) => {
        const p = player as Player
        const a = alphabet as Alphabet
        if (p && a) {
          a.onWorldBounds()
          const collectedAlphaber = a.char
          const index = this.toCollect.indexOf(collectedAlphaber)
          if (index !== -1 && index >= 0 && index < this.toCollect.length) {
            this.toCollect.splice(index, 1)
            this.collected.push(collectedAlphaber)
            this.sound.play('collect');
          }
        }
      })
    }

    if (this.player && this.crossWord) {
      this.physics.overlap(this.player, this.crossWord, () => {
        if (this.collected.length >= 1) {
          this.collected.forEach(c => this.deposited.push(c))
          this.collected = []
          this.crossWord?.reveal(this.deposited)
        }
      })
    }
  }
}
