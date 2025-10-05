import Scene from '../scene.js';
import Sphere from '../sphere.js';
import Vec2 from '../vec2.js'

export default class MenuScene extends Scene {
    constructor(name, map) {
        super(name);
        this.map = map;
        this.drawMap = [];
        for(let i = 0; i < this.map.length; i++) {
            this.drawMap.push(new Sphere(new Vec2(0, 0)))
        }
    }

    onResize(CENTER, padding) {
        const defaultRadius = this.drawMap[0].size;
        let offset = new Vec2(CENTER.x - padding - defaultRadius * 2, CENTER.y - padding - defaultRadius * 2);
        for (let i = 0; i < this.drawMap.length; i++) {
            this.drawMap[i].position.x = offset.x + (i % 3) * (defaultRadius * 2 + padding);
            this.drawMap[i].position.y = offset.y + parseInt(i / 3) * (defaultRadius * 2 + padding);
        }
    }

    start() {
        
    }

    update() {
        for(let i = 0; i < this.drawMap.length; i++) {
            this.drawMap[i].update();
        }
    }

    draw(c) { 
        for(let i = 0; i < this.drawMap.length; i++) {
            this.drawMap[i].draw(c, i + 1);
        }
    }

    dispose() {

    }
}