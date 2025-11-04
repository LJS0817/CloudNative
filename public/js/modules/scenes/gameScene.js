import Scene from '../scene.js';
import Hero from '../hero.js';
import Vec2 from '../vec2.js'
import BulletManager from '../../Mng/bulletManager.js';
import RazerManager from '../../Mng/razerManager.js';

export default class GameScene extends Scene {
    constructor() {
        super();
        this.drawMap = [];
        this.canvasSize = new Vec2(0, 0);
        this.curTime = 0;
    }

    init(map, uiMng, socket, sceneMng) {
        this.sceneMng = sceneMng;
        this.hero = new Hero();
        this.bulletMng = new BulletManager();
        this.razerMng = new RazerManager();
        // this.drawMap.push(new Sphere(new Vec2(0, 0)))
        this.uiMng = uiMng;
        this.socket = socket;

        this.socket.on('word', (word) => {
            console.log(word);
            const spawnPos = this.getRandomSpawnPosition();
            this.bulletMng.createBullet(spawnPos, this.hero, word);
        })
    }

    onResize(CENTER, _, size) {
        this.canvasSize = size.copy();
        this.hero.setDrawPosition(CENTER);
        this.bulletMng.onResize(CENTER, size);
        this.razerMng.onResize(CENTER);

        // const defaultRadius = this.drawMap[1].size;
        // let offset = new Vec2(CENTER.x - padding - defaultRadius * 2, CENTER.y - padding - defaultRadius * 2);
        // for (let i = 1; i < this.drawMap.length; i++) {
        //     this.drawMap[i].setDrawPosition(offset);
        // }
    }

    start() {
        this.uiMng.inGameIcon.classList.remove('hidden');
        this.uiMng.UpdateUIText(0, 'SURVIVE');
        this.uiMng.UpdateUIText(1, `Count : ${this.hero.cnt} / 20`);
        // this.uiMng.enterCallback = () => { this.sceneMng.changeScene(0) };
        this.uiMng.enterCallback = (str) => { 
            if(str == 'return') {
                this.socket.emit('enterText', {text:'return'})
                return true;
            } else {
                let rst = this.bulletMng.checkValidInput(str);
                if(rst != undefined) {
                    this.razerMng.fire(this.hero.position.copy(), rst);
                    this.socket.emit('catch')
                    this.hero.attack();
                    this.uiMng.UpdateUIText(1, `Count : ${this.hero.cnt} / 20`);
                }
                return rst != undefined;
            }
        };

        this.hero.init();
        this.bulletMng.init();

        this.uiMng.addClassList('game');

        this.curTime = Date.now();

        this.failed = false;
    }

    update(dt) {
        // this.clocking();

        if(this.hero.hp <= 0 && !this.failed) {
            this.failed = true;
            this.uiMng.UpdateUIText(0, 'FAILED');
            this.uiMng.UpdateUIText(1, 'please entner "return" to map');
            this.socket.emit('fail');
        } else if(!this.failed) {
            this.hero.update();
            this.bulletMng.update(dt);
            this.razerMng.update(dt);

            this.collisionDetection();
        }
    }

    draw(c) { 
        this.razerMng.draw(c);
        this.hero.draw(c);
        this.bulletMng.draw(c);
    }

    collisionDetection() {
        if(!this.failed) this.bulletMng.collisionDetect();
    }

    dispose() {
        clearInterval(this.intervalID);
        this.uiMng.removeClassList('game');
    }

    clocking() {
        if (this.curTime > 0) {
            const elapsedMilliseconds = Date.now() - this.curTime;
            const seconds = Math.floor(elapsedMilliseconds / 1000);

            // UI 업데이트
            if (seconds !== this.elapsedSeconds) {
                this.elapsedSeconds = seconds;
                
                const remainingSeconds = seconds % 60;
                this.uiMng.UpdateUIText(1, `${remainingSeconds.toString().padStart(2, '0')}`);
            }
        }
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