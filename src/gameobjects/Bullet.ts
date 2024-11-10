import Phaser from 'phaser'

export default class Bullet extends Phaser.Physics.Arcade.Image
{
    fire (x: number, y: number, vx: number, vy: number)
    {
        this.disableBody(true, true)
        this.enableBody(true, x, y, true, true)
        this.setVelocity(vx, vy)
    }

    onCreate ()
    {
        this.disableBody(true, true)
        this.setCollideWorldBounds(false)
        this.onWorldBounds()
    }

    onWorldBounds ()
    {
        console.log('disable bullet')
        this.disableBody(true, true)
    }

    deactivateBullet() {
        if (this.y <= 0)
            this.onWorldBounds()
    }
}