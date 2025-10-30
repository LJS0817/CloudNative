import Scene from '../scene.js';
import Hero from '../hero.js';
import Vec2 from '../vec2.js'
import Sphere from '../sphere.js';
import BulletManager from '../../Mng/bulletManager.js';

export default class GameScene extends Scene {
    constructor() {
        super();
        this.drawMap = [];
    }

    init(map, uiMng, sceneMng) {
        this.sceneMng = sceneMng;
        this.hero = new Hero();
        this.bulletMng = new BulletManager();
        this.drawMap
        // this.drawMap.push(new Sphere(new Vec2(0, 0)))
        this.uiMng = uiMng;
    }

    onResize(CENTER, size) {
        this.hero.setDrawPosition(CENTER);
        this.bulletMng.onResize(CENTER, size);

        // const defaultRadius = this.drawMap[1].size;
        // let offset = new Vec2(CENTER.x - padding - defaultRadius * 2, CENTER.y - padding - defaultRadius * 2);
        // for (let i = 1; i < this.drawMap.length; i++) {
        //     this.drawMap[i].setDrawPosition(offset);
        // }
    }

    start() {
        this.uiMng.UpdateUIText(0, 'TEST');
        this.uiMng.UpdateUIText(1, '12345');
        // this.uiMng.enterCallback = () => { this.sceneMng.changeScene(0) };
        this.uiMng.enterCallback = (str) => { 
            return this.bulletMng.checkValidInput(str);
        };
        this.uiMng.addClassList('game');

        this.bulletMng.createBullet(new Vec2(200, 200), this.hero.position.copy(), 'test');
    }

    update() {
        this.hero.update();
        this.bulletMng.update();

        this.collisionDetection()
        // for(let i = 0; i < this.drawMap.length; i++) {
        //     this.drawMap[i].update();
        // }
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
        this.bulletMng.collisionDetect(this.hero);
    }

    dispose() {
        this.uiMng.removeClassList('game');
    }
}