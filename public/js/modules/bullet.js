import Vec2 from './vec2.js'
import Sphere from './sphere.js';


export default class Bullet extends Sphere {
    constructor() {
        super(new Vec2(-10000, -10000), 30, '#86ff80ff');
        this.enable = false;
        this.baseSpeed = 750;
        this.direction = new Vec2(0, 0);
        this.word = undefined;
        this.freeze = false;

        this.DEFAULT_SIZE = 30;
        this.MIN_SIZE = 10;

        this.DEFAULT_COLOR = '#86ff80ff';
        this.MIN_COLOR = '#ffa3a3ff';

        this.target = undefined;
    }

    update() {
        if(this.enable && !this.freeze) {
            this.addPosition(this.velocity);
        } else if(this.freeze) {
            
        }
    }

    draw(ctx) {
        if(this.enable) {
            super.draw(ctx, "");

            if(this.word == undefined) return;
            ctx.fillStyle = this.freeze ? getComputedStyle(ctx.canvas).getPropertyValue("--primary") : 'white';
            ctx.font = 'bold ' + (30) + 'px "Inter"';
            ctx.fillText(this.word, this.drawPosition.x, this.drawPosition.y + this.size + 30);
        }
    }

    activate(pos, dir, word, scale, target) {
        this.addPosition(pos.sub(this.position));
        this.direction = dir;
        this.velocity = this.direction.mul(this.baseSpeed);
        this.target = target;
        // this.velocity = this.direction.mul(scale.mul(this.baseSpeed));
        this.enable = true;
        this.word = word;

        this.size = word == undefined ? this.MIN_SIZE : this.DEFAULT_SIZE;
        this.color = word == undefined ? this.MIN_COLOR : this.DEFAULT_COLOR;
    }

    deactivate() {
        this.enable = false;
        this.addPosition(new Vec2(-10000, -10000).sub(this.position))
        this.velocity = new Vec2(0, 0);
        this.direction = new Vec2(0, 0);
        this.word = undefined;
        this.target = undefined;
    }

    updateSpeed(scale) {
        this.velocity = this.direction.mul(scale.mul(this.baseSpeed));
    }

    die() {
        this.freeze = true;
    }

    collsionCondition() {
        return this.enable && (this.position.mag(this.target.position) < (this.size + this.target.size));
    }

    onCollision() {
        if(this.word == undefined) this.target.deactivate();
        else this.target.attacked()
        this.deactivate();
        console.log("collide")
    }

    compareWord(str) {
        return this.enable && this.word != undefined && str.replaceAll(' ', '') == this.word;
    }
}