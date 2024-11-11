import { Scene } from 'phaser'
import Wall from '../gameobjects/Wall'
import Garden from '../gameobjects/Graden'
import CrossWord from '../gameobjects/CrossWord'
import Player from '../gameobjects/Player'
import Bullets from '../gameobjects/Bullets'
import Enemies from '../gameobjects/Enemies'
import { getRandomFromArray } from '../helper'
import Enemy from '../gameobjects/Enemy'
import Bullet from '../gameobjects/Bullet'
import Alphabets from '../gameobjects/Alphabets'
import Alphabet from '../gameobjects/Alphabet'

const MAX_LEVEL_TIME = 300
const MAX_ENEMIES = 5

export class ArenaScene extends Scene {
  game_time = MAX_LEVEL_TIME
  points = 0
  current_level = 1
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  wallGroup: Wall | undefined
  innerGarden: Garden | undefined
  crossWord: CrossWord | undefined
  player: Player | undefined
  bullets: Bullets | undefined
  inputKeys: Phaser.Input.Keyboard.Key[] | any[]
  enemies: Enemies | undefined
  enemy_ys: number[] = [128, 128+64, 1280 - 128, 1280 - (128*2)]
  enemy_xs: number[] = [128, 256, 1280 - 128, 1280 - 256]
  enemy_positions: {x: number, y:number}[] = []
  overlapAdded = false
  alphabets: Alphabets
  collected: string[] = []
  toCollect: string[] = ['A', 'B', 'C', 'D']
  deposited: string[] = []

  constructor() {
    super('ArenaScene')
  }

  init() {
    this.cameras.main.fadeIn(1000, 0, 0, 0)
    this.scene.launch('MenuScene')

    // Reset points
    this.game_time = MAX_LEVEL_TIME

    for (let i = 2; i < 12; i++) {
      this.enemy_ys.push(i*64)
    }
  }


  create() {
    this.game.events.on('start-game', () => {
      this.scene.stop('MenuScene')
      this.scene.launch('HudScene', { remaining_time: this.game_time, deposited_count: this.deposited.length })
      this.cursors = this.input.keyboard?.createCursorKeys()
      this.physics.world.createDebugGraphic();
      this.physics.world.debugGraphic.visible = true;
      this.physics.world.on('worldbounds', (body: any) =>
      {
        console.log('onworldbounds')
          body.gameObject.onWorldBounds();
      });
      this.createLevel()

      // Game Over timeout
      this.time.addEvent({
        delay: 1000,
        loop: true,
        callback: () => {
          if (this.game_time <= 0) {
            // You need remove the event listener to avoid duplicate events.
            this.game.events.removeListener('start-game')
            // It is necessary to stop the scenes launched in parallel.
            this.scene.stop('HudScene')
            // this.scene.start("GameOverScene", { points: this.points });
          } else {
            this.game_time--
            // @ts-ignore
            this.scene.get('HudScene').update_timeout(this.game_time)
            // @ts-ignore
            this.scene.get('HudScene').update_points(this.deposited.length)
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
            this.enemy_positions.push({x, y})
            this.enemies?.spawn(x, y)
          }
        }
      })

      // this.time.addEvent({
      //   delay: 1000,
      //   loop: true,
      //   callback: () => {
      //     if (this.enemies && this.bullets && this.enemies.children.entries.length === 5) {
      
      //       this.enemies?.getChildren().forEach(child => {
      //         const enemy = child as Enemy
      //         console.log('add overlap')
      //         this.physics.overlap(enemy, this.bullets, (enemy, bullet) => {
      //          const b = bullet as Bullet
      //          const e = enemy as Enemy
      //          console.log('overlap !!!')
      //          if (b && e) {
      //            b.onWorldBounds()
      //            e.hit()
      //          }
      //        })
      //       });
      //     }
      //   }
      // })
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
    this.bullets = new Bullets(this, { name: 'bullets'})
    this.enemies = new Enemies(this, {name: 'enemies'}, this.bullets)
    this.alphabets = new Alphabets(this, {name: 'alphabets'})

      
    this.input.on('pointerdown', () =>
    {
        this.bullets?.fire(this.player?.body?.x || 0, this.player?.body?.y || 0, this.player?.direction || "down");
    });
    // Firing bullets should also work on enter / spacebar press
		this.inputKeys = [
			this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
		];

  }

  update() {
    this.player?.move(this.cursors)
    this.wallGroup?.refresh()
    // Loop over all keys
		this.inputKeys?.forEach(key => {
			// Check if the key was just pressed, and if so -> fire the bullet
			if(Phaser.Input.Keyboard.JustDown(key)) {
				this.bullets?.fire(this.player?.body?.x || 0, this.player?.body?.y || 0, this.player?.direction || "down");
			}
		});
    this.bullets?.deactivateBullets()
    this.enemies?.killEnemies()
    this.alphabets?.deactivateAlphabets()

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
            this.alphabets.spawn(e.body.x, e.body.y)
           }
         }
       })
      });
    }


    if (this.player && this.alphabets) {
      this.physics.overlap(this.player, this.alphabets, (player, alphabet) => {
        const p = player as Player
        const a = alphabet as Alphabet
        if (p && a) {
          a.onWorldBounds()
          // collect alphabet
          if (this.toCollect.length >= 1) {
            const x = this.toCollect.pop()
            if (x) {
              this.collected.push(x)
            }
          }
        }
      })
    }

    if (this.player && this.crossWord) {
      this.physics.overlap(this.player, this.crossWord, (p, c) => {
        if (this.collected.length >= 1) {
          this.collected.forEach(c => this.deposited.push(c))
          this.collected = []
          this.crossWord?.reveal(this.deposited)
        }
      })
    }
  }
}
