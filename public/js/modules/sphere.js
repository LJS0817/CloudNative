import Unit from './unit.js';
import Vec2 from './vec2.js';

export default class Sphere extends Unit {
    constructor(position, radius=80, color='#D9D9D9') {
        super(position, new Vec2(0, 0), radius, color);
        this.fontSize = (this.size > 50 ? this.size - 45 : this.size * 0.8);
    }

    update() {

    }

    draw(ctx, str) {
        ctx.beginPath();
        ctx.arc(this.drawPosition.x, this.drawPosition.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();


        ctx.font = 'bold ' + (this.fontSize) + 'px "Inter"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';

        ctx.fillText(str, this.drawPosition.x, this.drawPosition.y);
    }

    collsionCondition(input) {
        return (this.drawPosition.mag(input.mousePosition) < this.radius);
    }

    onCollision(input) {
        
    }
}