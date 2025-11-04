export default class SceneManager {
    constructor(scenes) {
        this.scenes = [];
    }

    initScene(map, uiMng, socket) {
        for(let i = 0; i < this.scenes.length; i++) {
            this.scenes[i].init(map, uiMng, socket, this);
        }
        this.changeScene(0);
    }

    setSelfId(idx) {
        for(let i = 0; i < this.scenes.length; i++) {
            this.scenes[i].setSelfId(idx);
        }
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
    getSceneIndex() { return this.index; }

    onResize(CENTER, padding, size) {
        for(let i = 0; i < this.scenes.length; i++) {
            this.getScene(i).onResize(CENTER, padding, size);
        }
    }
}