import Scene from '../scene.js';
import Sphere from '../sphere.js';
import Vec2 from '../vec2.js'

export default class MenuScene extends Scene {
    constructor() {
        super();
        this.drawMap = [];
    }

    init(map, uiMng, sceneMng) {
        this.sceneMng = sceneMng;
        this.drawMap = [];
        for(let i = 0; i < map.length; i++) {
            this.drawMap.push(new Sphere(new Vec2(0, 0)))
        }
        this.uiMng = uiMng;
    }

    onResize(CENTER, padding) {
        const defaultRadius = this.drawMap[0].size;
        let offset = new Vec2(CENTER.x - padding - defaultRadius * 2, CENTER.y - padding - defaultRadius * 2);
        for (let i = 0; i < this.drawMap.length; i++) { 
            this.drawMap[i].drawPosition.x = offset.x + (i % 3) * (defaultRadius * 2 + padding);
            this.drawMap[i].drawPosition.y = offset.y + parseInt(i / 3) * (defaultRadius * 2 + padding);
        }
    }

    start() {
        this.uiMng.UpdateUIText(0, 'PRESS ENTER');
        this.uiMng.UpdateUIText(1, '');
        this.uiMng.enterCallback = () => { this.sceneMng.changeScene(1); };
    }

    update() {
        // for(let i = 0; i < this.drawMap.length; i++) {
        //     this.drawMap[i].update();
        // }
    }

    draw(c) { 
        for(let i = 0; i < this.drawMap.length; i++) {
            this.drawMap[i].draw(c, i + 1);
        }
    }

    collisionDetection(input) {
        // if(input.isKeyPressed())
        
    }

    dispose() {

    }
}