import { Scene } from 'phaser'
import { GAME_HEIGHT, GAME_WIDTH, TILE_SIZE } from '../helper'

export class MenuScene extends Scene {
  constructor() {
    super('MenuScene')
  }

  init() {
    this.cameras.main.fadeIn(1000, 0, 0, 0)
  }

  create() {

    this.add.sprite(TILE_SIZE * 4, TILE_SIZE * 4, 'player').setScale(2)

    this.add.sprite(GAME_WIDTH - TILE_SIZE * 4, TILE_SIZE * 4, 'enemy', 0).setScale(1.5)
    this.add.sprite(GAME_WIDTH - TILE_SIZE * 8, TILE_SIZE * 4, 'enemy', 8).setScale(1.5)
    this.add.sprite(GAME_WIDTH - TILE_SIZE * 4, TILE_SIZE * 6, 'enemy', 16).setScale(1.5)
    this.add.sprite(GAME_WIDTH - TILE_SIZE * 8, TILE_SIZE * 6, 'enemy', 24).setScale(1.5)
    this.add
      .rectangle(0, this.scale.height / 2 + 85, this.scale.width, 50, 0x000000)
      .setAlpha(0.8)
      .setOrigin(0, 0.5)
    this.add.text(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      'Letter Quest',
      {
        fontFamily: 'monospace',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center'
      }
    )

    this.add.text(
      TILE_SIZE * 4,
      GAME_HEIGHT - TILE_SIZE * 6.5,
      'Eliminate enemies to collect alphabets and reveal the secret word',
      {
        fontFamily: 'monospace',
        fontSize: 12,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center'
      }
    )


    this.add
      .text(
        GAME_WIDTH / 2, GAME_HEIGHT - TILE_SIZE * 3,
        'CLICK TO START',
        {
          fontFamily: 'monospace',
          fontSize: 12,
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 8,
          align: 'center'
        }
      )

    this.add
      .text(
        TILE_SIZE * 4, GAME_HEIGHT - TILE_SIZE * 3,
        'SpaceBar = Shoot',
        {
          fontFamily: 'monospace',
          fontSize: 12,
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 8,
          align: 'center'
        }
      )

    this.add
      .text(
        GAME_WIDTH - TILE_SIZE * 4, GAME_HEIGHT - TILE_SIZE * 3,
        'Arrow Keys = Move',
        {
          fontFamily: 'monospace',
          fontSize: 12,
          color: '#ffffff',
          stroke: '#000000',
          strokeThickness: 8,
          align: 'center'
        }
      )

    this.input.on('pointerdown', () => {
      this.game.events.emit('start-game')
    })
  }
}

