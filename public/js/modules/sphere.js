import Unit from './unit.js';
import Vec2 from './vec2.js';

export default class Sphere extends Unit {
    constructor(position, radius=80, color='#D9D9D9') {
        super(position, new Vec2(0, 0), radius, color);
    }

    update() {

    }

    draw(ctx, i) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();


        ctx.font = 'bold ' + (this.size - 45) + 'px "Inter"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';

        ctx.fillText(i, this.position.x, this.position.y);
    }

    collsionCondition(input) {
        return (this.position.mag(input.mousePosition) < this.radius);
    }

    onCollision(input) {
        
    }
}