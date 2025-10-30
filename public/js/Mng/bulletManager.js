import Bullet from '../modules/bullet.js'
import Vec2 from '../modules/vec2.js';

export default class BulletManager {
    constructor() {
        this.MAX_BULLET = 50;
        this.bulletPool = [];
        for(let i = 0; i < this.MAX_BULLET; i++) {
            this.bulletPool.push(new Bullet());
        }
        this.baseSize = new Vec2(1686, 1271); // 기준 캔버스 너비 (speed 300의 기준)
        this.speedScale = new Vec2(1.0, 1.0);
    }

    update() {
        for(let i = 0; i < this.MAX_BULLET; i++) {
            this.bulletPool[i].update();
        }
    }

    draw(c) {
        for(let i = 0; i < this.MAX_BULLET; i++) {
            this.bulletPool[i].draw(c);
        }
    }

    createBullet(pos, target, word) {
        let b = this.bulletPool.pop();
        b.activate(pos, target.sub(pos).normalized(), word, this.speedScale);
        this.bulletPool.push(b);
    }

    onResize(center, size) {
        this.speedScale.x = size.x / this.baseSize.x;
        this.speedScale.y = size.y / this.baseSize.y;
        console.log(this.speedScale)
        for(let i = 0; i < this.MAX_BULLET; i++) {
            this.bulletPool[i].setDrawPosition(center);
            if(this.bulletPool[i].enable) {
                this.bulletPool[i].updateSpeed(this.speedScale);
            }
        }
    }

    collisionDetect(target) {
        for(let i = 0; i < this.MAX_BULLET; i++) {
            if(this.bulletPool[i].collsionCondition(target)) {
                this.bulletPool[i].onCollision();
            }
        }
    }

    checkValidInput(str) {
        for(let i = 0; i < this.MAX_BULLET; i++) {
            if(this.bulletPool[i].compareWord(str)) {
                // this.bulletPool[i].deactivate();
                this.bulletPool[i].die();
                return true;
            }
        }
        return false;
    }
}