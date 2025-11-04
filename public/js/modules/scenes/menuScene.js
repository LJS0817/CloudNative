import Scene from '../scene.js';

export default class MenuScene extends Scene {
    constructor() {
        super();
    }

    init(map, uiMng, socket, sceneMng) {
        this.sceneMng = sceneMng;
        this.uiMng = uiMng;
        this.socket = socket;
        this.map = map;
    }

    onResize(CENTER, padding, size) {
        this.map.onResize(CENTER, padding, size);
    }

    start() {
        this.uiMng.inGameIcon.classList.add('hidden');
        this.uiMng.UpdateUIText(0, this.uiMng.Contains('waiting') ? 'WAITING FOR PLAYER...' : 'ENTER MAP NUMBER (1-9)');
        this.uiMng.UpdateUIText(1, '');
        this.uiMng.enterCallback = (str) => { 
            console.log(this.uiMng.Contains('waiting'));
            if(this.uiMng.Contains('waiting')) return false;
            const idx = parseInt(str);
            this.socket.emit('enterText', {text : str});   
            return true; 
            // if(!isNaN(idx) && idx <= 9 && this.map.getMapIndex(idx) < 2) {
            //     this.socket.emit('enterText', {text : str});    
            //     return true;
            // }
            // return false;
        };
    }

    update(dt) {
        // for(let i = 0; i < this.drawMap.length; i++) {
        //     this.drawMap[i].update();
        // }
    }

    draw(c) { 
        this.map.mapDraw(c);
    }

    collisionDetection(input) {
        // if(input.isKeyPressed())
        
    }

    dispose() {

    }
}