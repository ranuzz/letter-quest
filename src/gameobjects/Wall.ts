// Import Phaser types
import Phaser from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH, TILE_CENTER, TILE_SIZE } from '../helper';

export default class Wall extends Phaser.Physics.Arcade.StaticGroup {

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene, [], {})
  }

  addWall() {
    // Arena outer wall
    for (let i = 0; i < 20; i++) {
      this.create(i * TILE_SIZE + TILE_CENTER, TILE_CENTER, 'wall')
    }
    for (let i = 0; i < 20; i++) {
      this.create(i * TILE_SIZE + TILE_CENTER, GAME_HEIGHT - TILE_CENTER, 'wall')
    }
    for (let i = 1; i < 15; i++) {
      this.create(TILE_CENTER, TILE_CENTER + i * TILE_SIZE, 'wall')
    }
    for (let i = 1; i < 15; i++) {
      this.create(GAME_WIDTH - TILE_CENTER, TILE_CENTER + i * TILE_SIZE, 'wall')
    }

    // Arena spawn zone with gates
    for (let i = 5; i < 15; i++) {
      if (i !== 9 && i !== 10) {
        this.create(i * TILE_SIZE + TILE_CENTER, TILE_CENTER + TILE_SIZE * 4, 'wall')
      }
    }
    for (let i = 5; i < 15; i++) {
      if (i !== 9 && i !== 10) {
        this.create(i * TILE_SIZE + TILE_CENTER, GAME_HEIGHT - (TILE_CENTER + TILE_SIZE * 4), 'wall')
      }
    }
    for (let i = 5; i < 11; i++) {
      if (i !== 7 && i != 8) {
        this.create(TILE_CENTER + TILE_SIZE * 5, TILE_CENTER + i * TILE_SIZE, 'wall')
      }
    }
    for (let i = 5; i < 11; i++) {
      if (i !== 7 && i != 8) {
        this.create(GAME_WIDTH - (TILE_CENTER + TILE_SIZE * 5), TILE_CENTER + i * TILE_SIZE, 'wall')
      }
    }
  }
}