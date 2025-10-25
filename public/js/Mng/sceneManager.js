import MenuScene from '../modules/scenes/menuScene.js';
import InputManager from './inputManager.js';
import MapManager from './mapManager.js';
import UIManager from './uiManager.js'

export default class SceneManager {
    constructor(canvas, gameUI) {
        this.map = new MapManager()
        this.inputMng = new InputManager()

        this.UIMng = new UIManager(gameUI);
        this.scenes = [
            new MenuScene('menu', this.map, this.UIMng, this),
        ];
        
        this.inputMng.attach(canvas, () => {this.UIMng.changeInputWidth()});

        this.index = -1;
        this.changeScene(0);
     }
    changeScene(idx) {
        if(this.index > -1) this.getCurrentScene().dispose();
        this.index = idx;
         this.getCurrentScene().start();
    }
    getCurrentScene() { return this.scenes[this.index]; }
    getScene(idx) { return this.scenes[idx]; }

    onResize(CENTER, padding) {
        for(let i = 0; i < this.scenes.length; i++) {
            this.getScene(i).onResize(CENTER, padding);
        }
    }
}