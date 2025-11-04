import Sphere from '../modules/sphere.js';
import Vec2 from '../modules/vec2.js';

export default class MapManager {
    constructor() {
        this.map = [
            -1, -1, -1,
            -1, -1, -1,
            -1, -1, -1    
        ];

        this.drawMap = [];
        
        for(let i = 0; i < this.map.length; i++) {
            this.drawMap.push(new Sphere(new Vec2(0, 0)));
        }

        this.effectColor = ['', '167, 178, 255', '225, 145, 142', '167, 178, 255', '225, 145, 142']
    }

    init() {
        for(let i = 0; i < 9; i++) {
            this.setMapIndex(i, -1);
        }
    }

    setMapIndex(idx, value) {
        this.map[idx] = value;
        this.drawMap[idx].showBackgroundEffect(this.effectColor[value + 1], value + 1);
    }

    getMapIndex(idx) {
        return this.map[idx]
    }

    getMap() {
        return this.map
    }

    mapDraw(c) {
        for(let i = 0; i < this.drawMap.length; i++) {
            this.drawMap[i].draw(c, i + 1);
        }
    }

    onResize(CENTER, padding, size) {
        const defaultRadius = this.drawMap[0].size;
        let offset = new Vec2(CENTER.x - padding - defaultRadius * 2, CENTER.y - padding - defaultRadius * 2);
        for (let i = 0; i < this.drawMap.length; i++) { 
            this.drawMap[i].drawPosition.x = offset.x + (i % 3) * (defaultRadius * 2 + padding);
            this.drawMap[i].drawPosition.y = offset.y + parseInt(i / 3) * (defaultRadius * 2 + padding);
        }
    }
}