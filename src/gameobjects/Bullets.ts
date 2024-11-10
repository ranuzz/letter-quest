import Phaser from 'phaser'
import Bullet from './Bullet';

export default class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene: Phaser.Scene, config: any)
    {
        super(
            scene.physics.world,
            scene,
            { ...config, classType: Bullet, createCallback: Bullets.prototype.onCreate }
        )

        this.createMultiple({
            key: 'bullet',
            quantity: 5
        });

        scene.add.existing(this)
    }

    fire (x: number, y: number, vx: number, vy: number)
    {
        const bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(x, y, vx, vy);
        }
    }

    onCreate (bullet: Bullet)
    {
        bullet.onCreate();
    }

    poolInfo ()
    {
        return `${this.name} total=${this.getLength()} active=${this.countActive(true)} inactive=${this.countActive(false)}`;
    }

    deactivateBullets() {
        this.getChildren().forEach(child => {
            (child as Bullet).deactivateBullet()
        });
    }
}