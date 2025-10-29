import Vec2 from './vec2.js';

export default class Unit {
    constructor(position, velocity, size, color) {
        this.position = position;
        this.velocity = velocity;
        this.size = size;
        this.color = color;
        this.drawPosition = position.copy();
        this.enable = true;
    }

    update() {
        // 위치에 속도를 더해 유닛을 이동시킵니다.
        // this.position = this.position.add(this.velocity);
    }

    draw(ctx) {
        
    }

    collsionCondition(input) {
        return (this.drawPosition.mag(input.mousePosition) < this.radius);
    }

    onCollision(input) {
        
    }

    setDrawPosition(pos) {
        this.drawPosition.x = this.position.x + pos.x;
        this.drawPosition.y = this.position.y + pos.y;
    }

    addPosition(vel) {
        this.position = this.position.add(vel);
        this.drawPosition = this.drawPosition.add(vel);
    }
}