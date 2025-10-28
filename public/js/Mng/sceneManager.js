export default class SceneManager {
    constructor(scenes) {
        this.scenes = [];
        this.index = -1;
    }

    initScene(map, uiMng) {
        for(let i = 0; i < this.scenes.length; i++) {
            this.scenes[i].init(map, uiMng, this);
        }
        this.changeScene(0);
    }

    addScene(scene) {
        this.scenes.push(scene);
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