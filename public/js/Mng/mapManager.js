export default class MapManager {
    constructor() {
        this.map = [
            -1, -1, -1,
            -1, -1, -1,
            -1, -1, -1    
        ]
    }

    setMapIndex(idx, value) {
        this.map[idx] = value
    }

    getMapIndex(idx) {
        return this.map[idx]
    }
}