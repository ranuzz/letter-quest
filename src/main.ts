import { AUTO, Game, Scale, Types } from 'phaser'
import { Preloader } from './preloader'
import { ArenaScene } from './scenes/Arena'
import { MenuScene } from './scenes/Menu'
import { HudScene } from './scenes/Hud'

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0, x: 0 }
    }
  },
  scene: [Preloader, ArenaScene, MenuScene, HudScene]
}

export default new Game(config)

