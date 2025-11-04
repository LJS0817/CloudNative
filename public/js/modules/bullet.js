import Vec2 from './vec2.js'
import Sphere from './sphere.js';


export default class Bullet extends Sphere {
    constructor() {
        super(new Vec2(-10000, -10000), 30, '#86ff80ff');
        this.enable = false;
        this.baseSpeed = 50000;
        this.direction = new Vec2(0, 0);
        this.word = undefined;
        this.freeze = false;

        this.DEFAULT_SIZE = 30;
        this.MIN_SIZE = 10;

        this.DEFAULT_COLOR = '#86ff80ff';
        this.MIN_COLOR = '#ffa3a3ff';

        this.target = undefined;

        this.aimed = false;
        this.hasBeenOnScreen = false;
    }

    init() {
        this.enable = false;
        this.word = undefined;
        this.freeze = false;

        this.target = undefined;

        this.aimed = false;
        this.hasBeenOnScreen = false;
    }

    update(deltaTime, canvasSize) {
        if(this.enable && !this.freeze) {
            this.addPosition(this.velocity.mul(deltaTime));

            if (canvasSize) {
                const halfWidth = canvasSize.x / 2;
                const halfHeight = canvasSize.y / 2;

                const isInside = (this.position.x >= -halfWidth &&
                    this.position.x <= halfWidth &&
                    this.position.y >= -halfHeight &&
                    this.position.y <= halfHeight);

                if (this.hasBeenOnScreen) {
                    // (상태 2: 이미 화면 안에 들어왔었음)
                    // 이제 화면 밖으로 "나가는지" 검사합니다.
                    if (!isInside) {
                        this.deactivate(); // (주석 해제)
                        console.log("Bullet deactivated (exited screen)");
                    }
                } else {
                    // (상태 1: 아직 화면 안에 들어온 적 없음)
                    // 화면 안으로 "들어왔는지" 검사합니다.
                    if (isInside) {
                        this.hasBeenOnScreen = true;
                        // console.log("Bullet has entered the screen");
                    }
                    // (아직도 밖이라면(isInside == false) 아무것도 하지 않습니다)
                }
            }
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
        // this.velocity = this.direction.mul(this.baseSpeed);
        this.target = target;
        this.velocity = this.direction.mul(scale.mul(this.baseSpeed));
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
        this.hasBeenOnScreen = false;
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

    aiming() {
        this.aimed = true;
    }

    compareWord(str) {
        return this.enable && !this.aimed && this.word != undefined && str.replaceAll(' ', '') == this.word;
    }
}