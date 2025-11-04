export default class Scene {
    constructor() {}
    init() { }
    start() { }
    update(dt) { }
    draw(c) { }
    dispose() { }
    setSelfId(index) { this.index = index; }

    onResize(CENTER, padding, size) { }
}