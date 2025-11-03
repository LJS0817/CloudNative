import InputManager from './inputManager.js';
import MapManager from './mapManager.js';
import UIManager from './uiManager.js'
import SceneManager from './sceneManager.js';

import MenuScene from '../modules/scenes/menuScene.js';
import GameScene from '../modules/scenes/gameScene.js';

export default class GameManager {
    constructor(canvas, gameUI, socket) {
        this.mapMng = new MapManager()
        this.inputMng = new InputManager()
        this.socket = socket;

        this.UIMng = new UIManager(gameUI);
        
        this.inputMng.attach(canvas, (e) => {
            if(e.key === 'Enter') {
                this.UIMng.onEnterEvent()
            }
            this.UIMng.changeInputWidth()
        });
        
        //private
        this.sceneMng = new SceneManager();
        this.sceneMng.addScene(new MenuScene());
        this.sceneMng.addScene(new GameScene());
        this.sceneMng.initScene(this.mapMng.getMap(), this.UIMng, this.socket);
     }

    update() { this.sceneMng.getCurrentScene().update(); }
    draw(ctx) { this.sceneMng.getCurrentScene().draw(ctx); }
    resize(center, padding, size) { this.sceneMng.onResize(center, padding, size); }
}