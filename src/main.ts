import { AUTO, Game, Scale, Types } from 'phaser'
import { Preloader } from './preloader'
import { ArenaScene } from './scenes/Arena'
import { MenuScene } from './scenes/Menu'
import { HudScene } from './scenes/Hud'
import { GAME_HEIGHT, GAME_WIDTH } from './helper'
import { GameOverScene } from './scenes/GameOver'

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: 'game-container',
  backgroundColor: '#000',
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0, x: 0 }
    }
  },
  scene: [Preloader, ArenaScene, MenuScene, HudScene, GameOverScene]
}

export default new Game(config)
