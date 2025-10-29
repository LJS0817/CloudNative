import Sphere from './sphere.js';
import Vec2 from './vec2.js'

export default class Hero extends Sphere {
    constructor() {
        super(new Vec2(0, 0));
    }

    update() {

    }

    draw(ctx, str) {
        super.draw(ctx, "HERO");
    }

    collsionCondition(input) {
        super.collsionCondition(input);
    }

    onCollision(input) {
    }

}