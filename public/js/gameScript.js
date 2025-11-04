import GameManager from './Mng/gameManager.js';
import Vec2 from './modules/vec2.js';
import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

const socket = io("http://socket.test.com", {
    withCredentials: true 
});
const cards = document.getElementsByClassName('player-card');

socket.on('connect', (s) => {
    // console.log("TEST");
    socket.emit('enterRoom', {url: window.location.pathname.split('/')[2]})
});

socket.on('updatePlayers', (playersList) => {
    let playerOne = null;
    let playerTwo = null;
    
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

socket.on('gameOver', (data) => {
    // data 객체 예시: { winnerIdx: 0, winnerName: 'admin' }

    console.log(`[Game Over] 승자: ${data.winnerName}`);

    // 1. UIManager를 통해 게임 오버 UI를 표시
    // (UIMng에 game-over 클래스 추가 기능이 있다고 가정)
    gameMng.UIMng.addClassList('game-over'); 
    
    // 2. 승리/패배 메시지 표시
    // (UIMng.UpdateUIText(0)이 'SERVIVE' 텍스트라고 가정)
    gameMng.UIMng.UpdateUIText(0, 'GAME OVER');
    
    // (UIMng.UpdateUIText(1)이 '12345' 텍스트라고 가정)
    if (gameMng.index === data.winnerIdx) {
        // (내가 승리한 경우)
        gameMng.UIMng.UpdateUIText(1, 'YOU WIN!');
    } else {
        // (내가 패배한 경우)
        gameMng.UIMng.UpdateUIText(1, `WINNER: ${data.winnerName}`);
    }

    // 3. 입력(Enter) 비활성화 (또는 메뉴로 돌아가도록 변경)
    gameMng.UIMng.enterCallback = (str) => {
        // (5초 뒤 자동으로 메뉴로 돌아가게 하므로, Enter 키는 아무것도 안 함)
        return false; 
    };

    // 4. 5초 후에 메뉴 씬(Scene 0)으로 자동 전환
    setTimeout(() => {
        // B. 서버에 'enterRoom'을 다시 전송하여 "같은 ID"의 방을 새로 생성
        const roomId = window.location.pathname.split('/')[2];
        socket.emit('enterRoom', { url: roomId });

        // C. 게임 오버 UI 정리
        gameMng.UIMng.removeClassList('game-over');
        gameMng.UIMng.UpdateUIText(1, '');
        gameMng.mapMng.init();
        gameMng.sceneMng.changeScene(0);

    }, 5000); // 5초 대기
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
let lastTime = 0;

function gameLoop(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000.0; // 초 단위
    lastTime = currentTime;
    // 1. 화면 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. 유닛 상태 업데이트
    gameMng.update(deltaTime);
    // sceneMng.getCurrentScene().update();

    // 3. 유닛 그리기
    gameMng.draw(ctx);
    // sceneMng.getCurrentScene().draw(ctx);

    // 4. 다음 프레임 요청
    requestAnimationFrame(gameLoop);
}

// 게임 시작
requestAnimationFrame(gameLoop);