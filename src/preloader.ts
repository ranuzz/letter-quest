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
    // this.load.image('rigid-block', 'using/ground_04.png')
    // this.load.image('inner-garden', 'using/ground_05.png')
    // this.load.image('alphabet-hidden', 'using/ground_03.png')
    // this.load.image('player-front', 'using/player_01.png')
    // this.load.image('bullet', 'using/bullet.png');
    this.load.image('player-bullet', 'gimp/player-bullet.png');
    this.load.image('enemy-bullet', 'gimp/enemy-bullet.png');
    this.load.spritesheet('player', 'gimp/player.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('enemy', 'gimp/enemy.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('alphabet', 'gimp/alphabet.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('wall', 'gimp/wall.png')
    this.load.image('grass', 'gimp/grass.png')
    this.load.image('hidden', 'gimp/hidden.png')


    // Event to update the loading bar
    this.load.on('progress', (progress: number) => {
      console.log('Loading: ' + Math.round(progress * 100) + '%')
    })
  }

  create() {
    this.scene.start('ArenaScene')
  }
}
