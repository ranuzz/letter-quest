import Phaser from 'phaser'
import Enemy from './Enemy';
import Bullets from './Bullets';

export default class Enemies extends Phaser.Physics.Arcade.Group
{
    curScene: Phaser.Scene | undefined
    bullets: Bullets
    constructor (scene: Phaser.Scene, config: any, bullets: Bullets)
    {
        super(
            scene.physics.world,
            scene,
            { ...config, classType: Enemy, createCallback: Enemies.prototype.onCreate }
        )

        this.curScene = scene
        this.bullets = bullets

        this.createMultiple({
            key: 'rigid-block',
            quantity: 5
        });

        scene.add.existing(this)
    }

    spawn (x: number, y: number)
    {
        const enemy = this.getFirstDead(false);

        if (enemy)
        {
            enemy.spawn(x, y);
        }
    }

    onCreate (enemy: Enemy)
    {
        enemy.onCreate();
    }

    poolInfo ()
    {
        return `${this.name} total=${this.getLength()} active=${this.countActive(true)} inactive=${this.countActive(false)}`;
    }

    activeCount() {
        return this.countActive(true)
    }

    killEnemies() {
        this.getChildren().forEach(child => {
            (child as Enemy).die()
        });
    }
}