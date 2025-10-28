import Sphere from './sphere.js';

export default class Hero extends Sphere {
    constructor(position) {
        super(position);
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