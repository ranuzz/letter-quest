export class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' })
  }

  preload() {
    this.load.setPath('assets')
    this.load.image('background', 'bg.png')
    this.load.image('player-bullet', 'gimp/player-bullet.png');
    this.load.image('enemy-bullet', 'gimp/enemy-bullet.png');
    this.load.spritesheet('player', 'gimp/player.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('enemy', 'gimp/enemy.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('alphabet', 'gimp/alphabet.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('wall', 'gimp/wall.png')
    this.load.image('grass', 'gimp/grass.png')
    this.load.image('hidden', 'gimp/hidden.png')
    this.load.audio('collect', 'sound/collect.wav')
    this.load.audio('fire', 'sound/fire.ogg')
    this.load.on('progress', (progress: number) => {
      console.log('Loading: ' + Math.round(progress * 100) + '%')
    })
  }

  create() {
    this.scene.start('ArenaScene')
  }
}
