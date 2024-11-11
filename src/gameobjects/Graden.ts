// Import Phaser types
import Phaser from 'phaser';

export default class Garden extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene)
  }

  addGardern() {

    // Inner garden
    for (let i = 6; i < 14; i++) {
      this.create(i * 64 + 32, 32 + 64 * 5, 'inner-garden')
    }
    for (let i = 6; i < 14; i++) {
      this.create(i * 64 + 32, 1024 - (32 + 64 * 5), 'inner-garden')
    }
    for (let i = 6; i < 10; i++) {
      this.create(32 + 64 * 6, 32 + i * 64, 'inner-garden')
    }
    for (let i = 6; i < 10; i++) {
      this.create(1280 - (32 + 64 * 6), 32 + i * 64, 'inner-garden')
    }
  }
}