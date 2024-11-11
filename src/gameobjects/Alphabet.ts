import Phaser from 'phaser'

export default class Alphabet extends Phaser.Physics.Arcade.Image
{

    disappearTimer = 50000
    onCreate ()
    {
        this.disappearTimer = 50000
        this.disableBody(true, true)
        this.setCollideWorldBounds(true)
        this.onWorldBounds()
    }

    spawn (x: number, y: number)
    {
        this.disappearTimer = 50000
        this.disableBody(true, true)
        this.enableBody(true, x, y, true, true)
    }
    onWorldBounds ()
    {
        this.disableBody(true, true)
        this.disappearTimer = 50000
    }

    deactivateAlphabet() {
        if (this.disappearTimer <= 0) {
            this.onWorldBounds()
        } else {
            this.disappearTimer -= 50
        }
    }
}