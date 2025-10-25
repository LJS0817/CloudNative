export default class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(otherVec) {
        return new Vec2(this.x + otherVec.x, this.y + otherVec.y);
    }

    sub(otherVec) {
        return new Vec2(this.x - otherVec.x, this.y - otherVec.y);
    }

    mag(otherVec) {
        let v = this.sub(otherVec);
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }
}