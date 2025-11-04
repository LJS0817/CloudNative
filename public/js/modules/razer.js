import Unit from './unit.js';
import Vec2 from './vec2.js';

export default class Razer extends Unit {
    constructor() {
        super(new Vec2(0, 0)); // Unit 생성자 호출
        this.enable = false;
        this.source = new Vec2(0, 0);
        this.target = new Vec2(0, 0);
        this.targetObj = undefined;
        
        this.maxWidth = 10;
        this.duration = 0.2; // 레이저 지속 시간 (0.2초)
        this.life = 0;       // 남은 수명
    }

    /**
     * 레이저를 활성화하고 애니메이션을 시작합니다.
     * @param {Vec2} source - 시작 위치 (Hero)
     * @param {Vec2} target - 끝 위치 (Bullet)
     * @param {number} maxWidth - 최대 두께
     * @param {number} duration - 지속 시간(초)
     */
    activate(source, target, maxWidth = 10, duration = 0.2) {
        this.source = source.copy();
        this.target = target.position.copy();
        this.targetObj = target;
        this.maxWidth = maxWidth;
        this.duration = duration;
        this.life = duration; // 수명을 꽉 채움
        this.enable = true;
    }

    update(dt) {
        if (!this.enable) return;

        // 수명을 깎음
        this.life -= dt;

        // 수명이 다하면 비활성화
        if(this.life <= 0.1 && this.targetObj != undefined) {
            this.targetObj.deactivate()
            this.targetObj = undefined;
        }
        if (this.life <= 0) {
            this.enable = false;
            this.life = 0;
        }
    }

    draw(ctx) {
        if (!this.enable) return;

        // 'ping-pong' 애니메이션 계산
        // life가 100% -> 0%로 줄어들 때
        // t는 0 -> 1.0 (sin(t * PI)는 0 -> 1 -> 0)
        const t = 1.0 - (this.life / this.duration);
        const progress = Math.sin(t * Math.PI);
        const currentWidth = this.maxWidth * progress;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.drawPosition.x + this.source.x, this.drawPosition.y + this.source.y);
        ctx.lineTo(this.drawPosition.x + this.target.x, this.drawPosition.y + this.target.y);
        
        ctx.strokeStyle = 'white';
        ctx.lineWidth = currentWidth + 2; // 바깥쪽 흰색 테두리
        ctx.lineCap = 'round';
        ctx.stroke();
        
        ctx.strokeStyle = '#86ff80ff'; // 안쪽 밝은색
        ctx.lineWidth = currentWidth; // 안쪽 레이저
        ctx.stroke();
        
        ctx.restore();
    }
    
    // Unit의 setDrawPosition 상속
}