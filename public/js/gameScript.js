const canvas = document.getElementById('canvas');
const boardContainer = document.querySelector('.board');

const ctx = canvas.getContext('2d');

function resizeAndDraw() {
    canvas.width = boardContainer.clientWidth;
    canvas.height = boardContainer.clientHeight;
}

resizeAndDraw();

window.addEventListener('resize', resizeAndDraw);

class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(otherVec) {
        return new Vec2(this.x + otherVec.x, this.y + otherVec.y);
    }

    subtract(otherVec) {
        return new Vec2(this.x - otherVec.x, this.y - otherVec.y);
    }
}

class Unit {
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

class Sphere extends Unit {
    constructor(position, radius, color) {
        super(position, new Vec2(0, 0), radius, color);
    }

    update() {

    }

    draw(ctx) {
        ctx.beginPath();
        // this.position, this.size, this.color 등은 모두 부모로부터 상속받은 속성입니다.
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

// --- 게임 루프 ---
function gameLoop() {
    // 1. 화면 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. 유닛 상태 업데이트
    // s.update();

    // 3. 유닛 그리기
    // s.draw(ctx);

    // 4. 다음 프레임 요청
    requestAnimationFrame(gameLoop);
}

// 게임 시작
gameLoop();