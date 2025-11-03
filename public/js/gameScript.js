import GameManager from './Mng/gameManager.js';
import Vec2 from './modules/vec2.js';
import { io } from "https://cdn.socket.io/4.7.2/socket.io.min.js";

const socket = io("http://socket.test.com", {
    withCredentials: true 
});
const cards = document.getElementsByClassName('player-card');

socket.on('connect', (s) => {
    socket.emit('enterRoom', {url: window.location.pathname.split('/')[2]})
});

socket.on('notNumber', () => {
    
})

socket.on('updatePlayers', (playersList) => {
    let playerOne = null;
    let playerTwo = null;

    // 1. 방장(playerOne)과 상대(playerTwo)를 찾습니다.
    for (let i = 0; i < 2; i++) {
        if (playersList[i] != undefined && playersList[i].isMaster) {
            playerOne = playersList[i];
        } else {
            playerTwo = playersList[i];
        }
    }
    const p1_rank = cards[0].querySelector('.player-rank');
    const p1_name = cards[0].querySelector('.player-name');
    
    if (playerOne) {
        p1_rank.innerText = `RANK ${playerOne.ranking}`;
        p1_name.innerText = playerOne.name;
    } else {
        p1_rank.innerText = 'RANK ?';
        p1_name.innerText = 'WAITING...';
    }

    // 3. "상대" (Player Two) 카드 UI 업데이트
    const p2_rank = cards[1].querySelector('.player-rank');
    const p2_name = cards[1].querySelector('.player-name');

    if (playerTwo) {
        p2_rank.innerText = `RANK ${playerTwo.ranking}`;
        p2_name.innerText = playerTwo.name;
    } else {
        p2_rank.innerText = '';
        p2_name.innerText = 'WAITING...';
    }
})

socket.on('roomClosed', (s) => {
    console.log("BOOOOOOOM!");
    socket.emit('leave');
    location.href='/discover';
});

document.getElementById('leave-btn').onclick = () => {
    socket.emit('leave');
    location.href='/discover';
}

window.addEventListener('beforeunload', (event) => {
    event.preventDefault();
});

const canvas = document.getElementById('canvas');
const boardContainer = document.querySelector('.board');
const gameUI = document.querySelector('.board .gameUI');

const ctx = canvas.getContext('2d');

const gameMng = new GameManager(canvas, gameUI, socket);

let CENTER = new Vec2(0, 0);
const padding = 110;

function resizeAndDraw() {
    canvas.width = boardContainer.clientWidth;
    canvas.height = boardContainer.clientHeight;
    CENTER.x = canvas.width / 2;
    CENTER.y = canvas.height / 2;
    // console.log(canvas.width + "  -   " + canvas.height)
    gameMng.resize(CENTER, padding, new Vec2(canvas.width, canvas.height));
}

resizeAndDraw();

window.addEventListener('resize', resizeAndDraw);

// --- 게임 루프 ---
function gameLoop() {
    // 1. 화면 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. 유닛 상태 업데이트
    gameMng.update();
    // sceneMng.getCurrentScene().update();

    // 3. 유닛 그리기
    gameMng.draw(ctx);
    // sceneMng.getCurrentScene().draw(ctx);

    // 4. 다음 프레임 요청
    requestAnimationFrame(gameLoop);
}

// 게임 시작
gameLoop();