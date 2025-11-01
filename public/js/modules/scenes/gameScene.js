import Scene from '../scene.js';
import Hero from '../hero.js';
import Vec2 from '../vec2.js'
import Sphere from '../sphere.js';
import BulletManager from '../../Mng/bulletManager.js';

export default class GameScene extends Scene {
    constructor() {
        super();
        this.drawMap = [];
        this.canvasSize = new Vec2(0, 0);
        this.curTime = 0;
    }

    init(map, uiMng, sceneMng) {
        this.sceneMng = sceneMng;
        this.hero = new Hero();
        this.bulletMng = new BulletManager();
        this.drawMap
        // this.drawMap.push(new Sphere(new Vec2(0, 0)))
        this.uiMng = uiMng;
    }

    onResize(CENTER, _, size) {
        this.canvasSize = size.copy();
        this.hero.setDrawPosition(CENTER);
        this.bulletMng.onResize(CENTER, size);

        // const defaultRadius = this.drawMap[1].size;
        // let offset = new Vec2(CENTER.x - padding - defaultRadius * 2, CENTER.y - padding - defaultRadius * 2);
        // for (let i = 1; i < this.drawMap.length; i++) {
        //     this.drawMap[i].setDrawPosition(offset);
        // }
    }

    start() {
        this.uiMng.UpdateUIText(0, 'SERVIVE');
        this.uiMng.UpdateUIText(1, '12345');
        // this.uiMng.enterCallback = () => { this.sceneMng.changeScene(0) };
        this.uiMng.enterCallback = (str) => { 
            let rst = this.bulletMng.checkValidInput(str);
            if(rst != undefined) {
                this.bulletMng.createBullet(this.hero.position.copy(), rst, undefined)
                this.hero.attack()
                // this.uiMng.UpdateUIText(1, this.hero.cnt);
            }
            return rst != undefined;
        };
        this.uiMng.addClassList('game');

        this.curTime = Date.now();

        const spawnPos = this.getRandomSpawnPosition();
        this.bulletMng.createBullet(spawnPos, this.hero, 'test');
    }

    update() {
        this.hero.update();
        this.bulletMng.update();

        this.collisionDetection()

       if (this.curTime > 0) {
            const elapsedMilliseconds = Date.now() - this.curTime;
            const seconds = Math.floor(elapsedMilliseconds / 1000);

            // UI 업데이트
            if (seconds !== this.elapsedSeconds) {
                this.elapsedSeconds = seconds;
                
                // 예: UI 매니저를 통해 타이머 텍스트 업데이트
                const minutes = Math.floor(seconds / 60);
                const remainingSeconds = seconds % 60;
                this.uiMng.UpdateUIText(1, `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`);
            }
        }
    }

    draw(c) { 
        this.hero.draw(c);
        this.bulletMng.draw(c);
        // this.drawMap[0].draw(c);
        // for(let i = 1; i < this.drawMap.length; i++) {
        //     this.drawMap[i].draw(c, i + 1);
        // }
    }

    collisionDetection() {
        this.bulletMng.collisionDetect();
    }

    dispose() {
        this.uiMng.removeClassList('game');
    }

    getRandomSpawnPosition() {
        const halfWidth = this.canvasSize.x / 2;
        const halfHeight = this.canvasSize.y / 2;
        const padding = 100; // 화면 밖 100px 여유

        const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        let x = 0;
        let y = 0;

        switch (side) {
            case 0: // Top
                x = Math.random() * (halfWidth * 2) - halfWidth; // -halfWidth ~ +halfWidth
                y = -halfHeight - padding;
                break;
            case 1: // Right
                x = halfWidth + padding;
                y = Math.random() * (halfHeight * 2) - halfHeight; // -halfHeight ~ +halfHeight
                break;
            case 2: // Bottom
                x = Math.random() * (halfWidth * 2) - halfWidth;
                y = halfHeight + padding;
                break;
            case 3: // Left
                x = -halfWidth - padding;
                y = Math.random() * (halfHeight * 2) - halfHeight;
                break;
        }
        return new Vec2(x, y);
    }
}