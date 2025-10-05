import MenuScene from './scenes/menuScene.js';

export default class SceneManager {
    constructor() {
        this.map = [
            -1, -1, -1,
            -1, -1, -1,
            -1, -1, -1    
        ]

        this.scenes = [
            new MenuScene('menu', this.map),
        ];
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