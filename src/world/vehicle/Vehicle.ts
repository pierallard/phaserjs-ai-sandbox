
import {Boid} from "../../ai/steering/Boid";
import {SteeringComputer} from "../../ai/steering/SteeringComputer";
import {BrainText} from "./info/BrainText";
import {Army} from "../Army";
import {Camera} from "./sensor/Camera";
import {Radar} from "./sensor/Radar";
import {HealthBar} from "../common/HealthBar";
import {VehicleBrain} from "./brain/VehicleBrain";

export abstract class Vehicle extends Phaser.Sprite implements Boid
{
    public body: Phaser.Physics.Arcade.Body;
    protected army: Army;
    protected camera: Camera;
    protected radar: Radar;
    protected behavior: SteeringComputer;
    protected brain: VehicleBrain;
    protected brainText: BrainText;
    protected healthBar: HealthBar;
    protected visibilityScope: number;
    protected maxVelocity: number;

    constructor (game: Phaser.Game, x: number, y: number, army: Army, radar: Radar, camera: Camera, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number)
    {
        super(game, x, y, key, frame);
        this.army = army;
        this.radar = radar;
        this.camera = camera;
        this.tint = army.getColor();
        this.maxHealth = 100;
        this.health = 100;
        this.healthBar = new HealthBar(this.game, this);
        this.visibilityScope = 200;
    }

    public update ()
    {
        this.brain.think();
        this.behavior.compute();
        this.updateAngle();
        this.brainText.update();
        this.healthBar.update();
    }

    public isAlive() :boolean
    {
        return this.health > 0;
    }

    public hit(damage: number)
    {
        this.damage(damage)
        if (this.isAlive()) {
            const hitSprite = this.game.add.sprite(this.x - this.width, this.y - this.height, 'SmallExplosion');
            hitSprite.animations.add('hit');
            hitSprite.animations.play('hit', 20, false, true);
        } else {
            const dieSprite = this.game.add.sprite(this.x - this.width, this.y - this.height, 'MediumExplosion');
            dieSprite.animations.add('die');
            dieSprite.animations.play('die', 20, false, true);
        }
    }

    public getArmy() :Army
    {
        return this.army;
    }

    public getStatus() :string
    {
        return this.brain.getStateName();
    }

    destroy(destroyChildren?: boolean): void
    {
        this.brainText.destroy();
        this.healthBar.destroy();
        super.destroy(destroyChildren);
    }

    updateAngle()
    {
        this.angle = 180 + Phaser.Math.radToDeg(
            Phaser.Point.angle(
                this.getPosition(),
                new Phaser.Point(
                    this.getPosition().x + this.getVelocity().x,
                    this.getPosition().y + this.getVelocity().y
                )
            )
        );
    }

    getVelocity(): Phaser.Point
    {
        return this.body.velocity;
    }

    getMaxVelocity(): Phaser.Point
    {
        return this.body.maxVelocity;
    }

    getPosition(): Phaser.Point
    {
        return this.body.center;
    }

    getMass(): number {
        return this.body.mass;
    }

    public getRadar(): Radar
    {
        return this.radar;
    }

    public getCamera(): Camera
    {
        return this.camera;
    }
}