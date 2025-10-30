import Vec2 from './vec2.js'
import Sphere from './sphere.js';


export default class Bullet extends Sphere {
    constructor() {
        super(new Vec2(-10000, -10000), 30, '#86ff80ff');
        this.enable = false;
        this.baseSpeed = 300;
        this.direction = new Vec2(0, 0);
        this.word = '';
        this.freeze = false;
    }

    update() {
        if(this.enable && !this.freeze) {
            this.addPosition(this.velocity);
        } else if(this.freeze) {
            
        }
    }

    draw(ctx) {
        if(this.enable) {
            super.draw(ctx, "B");

            ctx.fillStyle = this.freeze ? getComputedStyle(ctx.canvas).getPropertyValue("--primary") : 'white';
            ctx.font = 'bold ' + (30) + 'px "Inter"';
            ctx.fillText(this.word, this.drawPosition.x, this.drawPosition.y + this.size + 30);
        }
    }

    activate(pos, dir, word) {
        this.addPosition(pos.sub(this.position));
        this.direction = dir;
        this.velocity = this.direction.mul(this.baseSpeed * scale);
        this.enable = true;
        this.word = word;
    }

    deactivate() {
        this.enable = false;
        this.addPosition(new Vec2(-10000, -10000).sub(this.position))
        this.velocity = new Vec2(0, 0);
        this.direction = new Vec2(0, 0);
        this.word = '';
    }

    updateSpeed(scale) {
        this.velocity = this.direction.mul(scale.mul(this.baseSpeed));
    }

    die() {
        this.freeze = true;
    }

    collsionCondition(target) {
        return this.enable && (this.position.mag(target.position) < (this.size + target.size));
    }

    onCollision() {
        this.deactivate();
        console.log("collide")
    }

    compareWord(str) {
        return this.enable && str.replaceAll(' ', '') == this.word;
    }
}