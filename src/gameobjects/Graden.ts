// Import Phaser types
import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH, TILE_CENTER, TILE_SIZE } from '../helper';

export default class Garden extends Phaser.Physics.Arcade.StaticGroup {
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene)
  }

  addGardern() {

    // Inner garden
    for (let i = 6; i < 14; i++) {
      this.create(i * TILE_SIZE + TILE_CENTER, TILE_CENTER + TILE_SIZE * 5, 'grass')
    }
    for (let i = 6; i < 14; i++) {
      this.create(i * TILE_SIZE + TILE_CENTER, GAME_HEIGHT - (TILE_CENTER + TILE_SIZE * 5), 'grass')
    }
    for (let i = 6; i < 10; i++) {
      this.create(TILE_CENTER + TILE_SIZE * 6, TILE_CENTER + i * TILE_SIZE, 'grass')
    }
    for (let i = 6; i < 10; i++) {
      this.create(GAME_WIDTH - (TILE_CENTER + TILE_SIZE * 6), TILE_CENTER + i * TILE_SIZE, 'grass')
    }
  }
}