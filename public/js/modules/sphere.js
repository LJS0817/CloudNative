import Unit from './unit.js';
import Vec2 from './vec2.js';

export default class Sphere extends Unit {
    constructor(position, radius=80, color='#D9D9D9') {
        super(position, new Vec2(0, 0), radius, color);
        this.fontSize = (this.size > 50 ? this.size - 45 : this.size * 0.8);
        this.isShown = false;
        this.done = false;
        this.effectColor = '167, 178, 255'
        this.effectFade = [
            {
                "alpha" : 0,
                "state" : 'in'
            },
            {
                "alpha" : 0,
                "state" : 'in'
            },
            {
                "alpha" : 0,
                "state" : 'in'
            }
        ]

        // this.showBackgroundEffect();
    }

    update() {

    }

    draw(ctx, str) {
        if(this.isShown) {
            ctx.beginPath();
            ctx.arc(this.drawPosition.x, this.drawPosition.y, this.size*1.39, 0, Math.PI * 2, false);
            ctx.arc(this.drawPosition.x, this.drawPosition.y, this.size*1.35, 0, Math.PI * 2, true);
            ctx.fillStyle = `rgba(${this.effectColor}, ${this.effectFade[0].alpha})`;
            ctx.fill();
            ctx.closePath();

            if(!this.done) {
                ctx.beginPath();
                ctx.arc(this.drawPosition.x, this.drawPosition.y, this.size*1.28, 0, Math.PI * 2, false);
                ctx.arc(this.drawPosition.x, this.drawPosition.y, this.size*1.22, 0, Math.PI * 2, true);
                ctx.fillStyle = `rgba(${this.effectColor}, ${this.effectFade[1].alpha})`;
                ctx.fill();
                ctx.closePath();
    
                ctx.beginPath();
                ctx.arc(this.drawPosition.x, this.drawPosition.y, this.size*1.15, 0, Math.PI * 2, false);
                ctx.fillStyle = `rgba(${this.effectColor}, ${this.effectFade[2].alpha})`;
                ctx.fill();
                ctx.closePath();
            }
        }

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

    showBackgroundEffect(color, idx) {
        if(color == '') {
            this.isShown = false;
            this.done = false;
            if(this.effectId != undefined) clearInterval(this.effectId);
        } else {
            this.effectColor = color;
            this.isShown = true;
            if(idx < 3)
                this.effectId = setInterval(() => {
                    this.effectFade[0].alpha += this.effectFade[0].state == 'in' ? 0.05 : -0.05;
                    this.effectFade[0].state = this.effectFade[0].alpha >= 1.5 ? 'out' : (this.effectFade[0].alpha <= -0.2 ? 'in' : this.effectFade[0].state);
                    this.effectFade[1].alpha += this.effectFade[1].state == 'in' ? 0.05 : -0.05;
                    this.effectFade[1].state = this.effectFade[1].alpha >= 1.5 ? 'out' : (this.effectFade[1].alpha <= -0.2 ? 'in' : this.effectFade[1].state);
                    this.effectFade[2].alpha += this.effectFade[2].state == 'in' ? 0.05 : -0.05;
                    this.effectFade[2].state = this.effectFade[2].alpha >= 1.5 ? 'out' : (this.effectFade[2].alpha <= -0.2 ? 'in' : this.effectFade[2].state);
                }, 50);
            else this.completeMission()
        }
    }

    completeMission() {
        this.done = true;
        this.isShown = true;
        this.effectFade[0].alpha = 1;
        if(this.effectId != undefined) clearInterval(this.effectId);
    }

    collsionCondition(input) {
        return (this.drawPosition.mag(input.mousePosition) < this.radius);
    }

    onCollision(input) {
        
    }
}