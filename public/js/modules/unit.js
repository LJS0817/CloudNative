import Vec2 from './vec2.js';

export default class Unit {
    constructor(position, velocity, size, color) {
        this.position = position;
        this.velocity = velocity;
        this.size = size;
        this.color = color;
    }

    update() {
        // 위치에 속도를 더해 유닛을 이동시킵니다.
        this.position = this.position.add(this.velocity);
    }

    draw(ctx) {
        
    }
}