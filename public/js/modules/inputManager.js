import Vec2 from './vec2.js';

class inputManager {
    constructor() {
        this.mousePosition = new Vec2(0, 0);
        this.isMouseDown = false;
        
        // 눌린 키의 상태를 저장하는 객체
        this.keys = {};
    }

    attach(element) {
        // 마우스 이동 이벤트
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            this.mousePosition.x = e.clientX - rect.left;
            this.mousePosition.y = e.clientY - rect.top;
        });

        // 마우스 버튼 누름 이벤트
        element.addEventListener('mousedown', (e) => {
            this.isMouseDown = true;
        });

        // 마우스 버튼 뗌 이벤트
        element.addEventListener('mouseup', (e) => {
            this.isMouseDown = false;
        });

        // 키보드 누름 이벤트 (window에 연결해야 전체에서 감지)
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        
        // 키보드 뗌 이벤트
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    getMousePosition() {
        return this.mousePosition;
    }

    // 특정 키가 눌렸는지 확인
    isKeyPressed(key) {
        return this.keys[key] || false;
    }
}

const inputMng = new inputManager();
export default inputMng;