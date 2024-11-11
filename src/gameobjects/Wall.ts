// Import Phaser types
import Phaser from 'phaser';

export default class Wall extends Phaser.Physics.Arcade.StaticGroup {

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene, [], {})
  }

  addWall() {
    // Arena outer wall
    for (let i = 0; i < 20; i++) {
      this.create(i * 64 + 32, 32, 'rigid-block')
    }
    for (let i = 0; i < 20; i++) {
      this.create(i * 64 + 32, 1024 - 32, 'rigid-block')
    }
    for (let i = 1; i < 15; i++) {
      this.create(32, 32 + i * 64, 'rigid-block')
    }
    for (let i = 1; i < 15; i++) {
      this.create(1280 - 32, 32 + i * 64, 'rigid-block')
    }

    // Arena spawn zone with gates
    for (let i = 5; i < 15; i++) {
      if (i !== 9 && i !== 10) {
        this.create(i * 64 + 32, 32 + 64 * 4, 'rigid-block')
      }
    }
    for (let i = 5; i < 15; i++) {
      if (i !== 9 && i !== 10) {
        this.create(i * 64 + 32, 1024 - (32 + 64 * 4), 'rigid-block')
      }
    }
    for (let i = 5; i < 11; i++) {
      if (i !== 7 && i != 8) {
        this.create(32 + 64 * 5, 32 + i * 64, 'rigid-block')
      }
    }
    for (let i = 5; i < 11; i++) {
      if (i !== 7 && i != 8) {
        this.create(1280 - (32 + 64 * 5), 32 + i * 64, 'rigid-block')
      }
    }
  }
}