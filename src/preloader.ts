// Class to preload all the assets
// Remember you can load this assets in another scene if you need it
export class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' })
  }

  preload() {
    // Load all the assets
    this.load.setPath('assets')

    this.load.image('background', 'bg.png')
    this.load.image('logo', 'logo.png')
    this.load.image('rigid-block', 'using/ground_04.png')
    this.load.image('inner-garden', 'using/ground_05.png')
    this.load.image('alphabet-hidden', 'using/ground_03.png')
    this.load.image('player-front', 'using/player_01.png')
    this.load.image('bullet', 'using/bullet.png');
    this.load.image('enemy', 'using/enemy.png')
    this.load.image('alphabe', 'using/alphabet.png')

    // Event to update the loading bar
    this.load.on('progress', (progress: number) => {
      console.log('Loading: ' + Math.round(progress * 100) + '%')
    })
  }

  create() {
    // Create bitmap font and load it in cache
    // const config = {
    //     image: 'knighthawks',
    //     width: 31,
    //     height: 25,
    //     chars: Phaser.GameObjects.RetroFont.TEXT_SET6,
    //     charsPerRow: 10,
    //     spacing: { x: 1, y: 1 }
    // };
    // this.cache.bitmapFont.add('knighthawks', Phaser.GameObjects.RetroFont.Parse(this, config));

    // When all the assets are loaded go to the next scene
    this.scene.start('ArenaScene')
  }
}
