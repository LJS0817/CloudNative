import Scene from '../scene.js';
import Hero from '../hero.js';
import Vec2 from '../vec2.js'
import Sphere from '../sphere.js';

export default class GameScene extends Scene {
    constructor() {
        super();
        this.drawMap = [];
    }

    init(map, uiMng, sceneMng) {
        this.sceneMng = sceneMng;
        this.drawMap.push(new Hero(new Vec2(0, 0)))
        // this.drawMap.push(new Sphere(new Vec2(0, 0)))
        this.uiMng = uiMng;
    }

    onResize(CENTER, padding) {
        this.drawMap[0].setDrawPosition(CENTER);

        // const defaultRadius = this.drawMap[1].size;
        // let offset = new Vec2(CENTER.x - padding - defaultRadius * 2, CENTER.y - padding - defaultRadius * 2);
        // for (let i = 1; i < this.drawMap.length; i++) {
        //     this.drawMap[i].setDrawPosition(offset);
        // }
    }

    start() {
        this.uiMng.UpdateUIText(0, 'TEST');
        this.uiMng.UpdateUIText(1, '12345');
        this.uiMng.enterCallback = () => { this.sceneMng.changeScene(0) };
        this.uiMng.addClassList('game');
    }

    update() {
        // for(let i = 0; i < this.drawMap.length; i++) {
        //     this.drawMap[i].update();
        // }
    }

    draw(c) { 
        this.drawMap[0].draw(c);
        // for(let i = 1; i < this.drawMap.length; i++) {
        //     this.drawMap[i].draw(c, i + 1);
        // }
    }

    collisionDetection(input) {
        // if(input.isKeyPressed())
        
    }

    dispose() {
        this.uiMng.removeClassList('game');
    }
}