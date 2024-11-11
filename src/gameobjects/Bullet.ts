import Phaser from 'phaser'

export default class Bullet extends Phaser.Physics.Arcade.Image
{
    fire (x: number, y: number, direction: string)
    {
        this.disableBody(true, true)
        this.enableBody(true, x, y, true, true)
        let vx = 0, vy = -500
        switch (direction) {
            case "up":
                vx = 0
                vy = -500
                break
            case "down":
                vx = 0
                vy = 500
                break
            case "left":
                vx = -500
                vy = 0
                break
            case "right":
                vx = 500
                vy = 0
                break
            default:
                break
        }
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
        this.disableBody(true, true)
    }

    deactivateBullet() {
        if (this.y <= 0 || this.y >= 1280 || this.x <=0 || this.x >= 1280) {
            this.onWorldBounds()
        }
    }
}