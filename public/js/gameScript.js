const canvas = document.getElementById('canvas');
const boardContainer = document.querySelector('.board');

const ctx = canvas.getContext('2d');

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

let CENTER = new Vec2(0, 0);

function resizeAndDraw() {
    canvas.width = boardContainer.clientWidth;
    canvas.height = boardContainer.clientHeight;
    CENTER.x = canvas.width / 2;
    CENTER.y = canvas.height / 2;
}

resizeAndDraw();

window.addEventListener('resize', resizeAndDraw);

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
}

const defaultRadius = 80;
const padding = 110;
const defaultColor = "#D9D9D9";

let map = [
    new Sphere(new Vec2(0, 0), defaultRadius, defaultColor), new Sphere(new Vec2(0, 0), defaultRadius, defaultColor), new Sphere(new Vec2(0, 0), defaultRadius, defaultColor),
    new Sphere(new Vec2(0, 0), defaultRadius, defaultColor), new Sphere(new Vec2(0, 0), defaultRadius, defaultColor), new Sphere(new Vec2(0, 0), defaultRadius, defaultColor),
    new Sphere(new Vec2(0, 0), defaultRadius, defaultColor), new Sphere(new Vec2(0, 0), defaultRadius, defaultColor), new Sphere(new Vec2(0, 0), defaultRadius, defaultColor),
]

function init() {
    let offset = new Vec2(CENTER.x - padding - defaultRadius * 2, CENTER.y - padding - defaultRadius * 2);
    for(let i = 0; i < map.length; i++) {
        map[i].position.x = offset.x + (i % 3) * (defaultRadius * 2 + padding);
        map[i].position.y = offset.y + parseInt(i / 3) * (defaultRadius * 2 + padding);
    }
}

function update() {
    for(let i = 0; i < map.length; i++) {
        map[i].update();
    }
}

function draw(c) {
    for(let i = 0; i < map.length; i++) {
        map[i].draw(c, i + 1);
    }
}

init();

// --- 게임 루프 ---
function gameLoop() {
    // 1. 화면 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. 유닛 상태 업데이트
    update();

    // 3. 유닛 그리기
    draw(ctx);

    // 4. 다음 프레임 요청
    requestAnimationFrame(gameLoop);
}

// 게임 시작
gameLoop();