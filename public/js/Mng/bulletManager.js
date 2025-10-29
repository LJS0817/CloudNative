import Bullet from '../modules/bullet.js'

export default class BulletManager {
    constructor() {
        this.MAX_BULLET = 50;
        this.bulletPool = [];
        for(let i = 0; i < this.MAX_BULLET; i++) {
            this.bulletPool.push(new Bullet());
        }
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
        b.activate(pos, target.sub(pos).normalized(), word);
        this.bulletPool.push(b);
    }

    setDrawPosition(center) {
        for(let i = 0; i < this.MAX_BULLET; i++) {
            this.bulletPool[i].setDrawPosition(center);
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