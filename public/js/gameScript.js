import SceneManager from './Mng/sceneManager.js';
import Vec2 from './modules/vec2.js';

const canvas = document.getElementById('canvas');
const boardContainer = document.querySelector('.board');
const gameUI = document.querySelector('.board .gameUI');

const ctx = canvas.getContext('2d');

const sceneMng = new SceneManager(canvas, gameUI);

let CENTER = new Vec2(0, 0);
const padding = 110;

function resizeAndDraw() {
    canvas.width = boardContainer.clientWidth;
    canvas.height = boardContainer.clientHeight;
    CENTER.x = canvas.width / 2;
    CENTER.y = canvas.height / 2;
    sceneMng.onResize(CENTER, padding);
}

resizeAndDraw();

window.addEventListener('resize', resizeAndDraw);

// --- 게임 루프 ---
function gameLoop() {
    // 1. 화면 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. 유닛 상태 업데이트
    sceneMng.getCurrentScene().update();

    // 3. 유닛 그리기
    sceneMng.getCurrentScene().draw(ctx);

    // 4. 다음 프레임 요청
    requestAnimationFrame(gameLoop);
}

// 게임 시작
gameLoop();