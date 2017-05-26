
import {Building} from "./Building";

export class Base extends Building
{
    private stockedQuantity: number = 0;

    constructor(game: Phaser.Game, x: number, y: number, key: string, frame: number)
    {
        super(game, x, y, key, frame);

        this.anchor.setTo(.5,.5);
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.allowGravity = false;
        this.inputEnabled = true;

        this.animations.add('idle', [0, 1, 2], 3, true);
        this.animations.add('build', [0, 1, 2, 3, 5, 6, 7], 5, true);
        this.animations.add('destroyed', [4], 5, true);
        this.animations.play('idle');

        game.add.existing(this);
    }

    public getStatus()
    {
        return this.animations.currentAnim.name+ ' (oil: ' + this.stockedQuantity +')';
    }

    public stock(quantity: number)
    {
        this.stockedQuantity += quantity;
    }
}
