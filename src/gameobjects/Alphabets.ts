import Phaser from 'phaser'
import Alphabet from './Alphabet';

export default class Alphabets extends Phaser.Physics.Arcade.Group
{
    constructor (scene: Phaser.Scene, config: any)
    {
        super(
            scene.physics.world,
            scene,
            { ...config, classType: Alphabet, createCallback: Alphabets.prototype.onCreate }
        )

        this.createMultiple({
            key: 'inner-garden',
            quantity: 5
        });

        scene.add.existing(this)
    }

    onCreate (a: Alphabet)
    {
        a.onCreate();
    }

    spawn (x: number, y: number)
    {
        const a = this.getFirstDead(false);

        if (a)
        {
            a.spawn(x, y);
        }
    }


    deactivateAlphabets() {
        this.getChildren().forEach(child => {
            (child as Alphabet).deactivateAlphabet()
        });
    }
}