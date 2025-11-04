import Razer from '../modules/razer.js';

export default class RazerManager {
    constructor() {
        this.MAX_RAZERS = 20; // 동시에 최대 20개
        this.pool = [];
        for (let i = 0; i < this.MAX_RAZERS; i++) {
            this.pool.push(new Razer());
        }
        this.center = null;
    }

    fire(source, target, maxWidth, duration) {
        // 비활성화된 레이저 찾기
        for (let i = 0; i < this.MAX_RAZERS; i++) {
            if (!this.pool[i].enable) {
                this.pool[i].activate(source, target, maxWidth, duration);
                return; // 하나 쏘고 함수 종료
            }
        }
        // (만약 풀이 꽉 찼으면 무시)
    }

    update(deltaTime) {
        for (let i = 0; i < this.MAX_RAZERS; i++) {
            if (this.pool[i].enable) {
                this.pool[i].update(deltaTime);
            }
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.MAX_RAZERS; i++) {
            if (this.pool[i].enable) {
                this.pool[i].draw(ctx);
            }
        }
    }
    
    onResize(center) {
        this.center = center;
         for (let i = 0; i < this.MAX_RAZERS; i++) {
            // 모든 레이저의 drawPosition을 캔버스 중심으로 설정
            this.pool[i].setDrawPosition(center);
        }
    }
}