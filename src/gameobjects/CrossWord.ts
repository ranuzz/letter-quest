// Import Phaser types
import Phaser from 'phaser';

export default class CrossWord extends Phaser.Physics.Arcade.Group {
    constructor(scene: Phaser.Scene) {
        super(scene.physics.world, scene)
    }

    addCrossWord() {
        
      // alphabet hidden
      for (let j = 0; j < 4; j++) {
        for (let i = 7; i < 13; i++) {
          this.create(i * 64 + 32, 32 + 64 * (6 + j), 'alphabet-hidden')
        }
      }
    }

    reveal(deposited: string[]){
      console.log(deposited)
      for (let j = 0; j < 4; j++) {
        for (let i = 7; i < 13; i++) {
          this.create(i * 64 + 32, 32 + 64 * (6 + j), 'inner-garden')
        }
      }
    }
}
