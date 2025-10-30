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

    mul(other) {
        if (other instanceof Vec2) {
            // 인자가 Vec2일 경우 (컴포넌트별 곱)
            return new Vec2(this.x * other.x, this.y * other.y);
        } else {
            // 인자가 스칼라(숫자)일 경우
            return new Vec2(this.x * other, this.y * other);
        }
    }

    mag(otherVec) {
        let v = this.sub(otherVec);
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    normalized() {
        let m = Math.sqrt(this.x*this.x + this.y*this.y)
        this.x /= m
        this.y /= m
        return new Vec2(this.x / m, this.y / m);
    }

    lerp(target, t) {
        return this.mul((1 - t)).add(target.mul(t));
    }

    copy() {
        return new Vec2(this.x, this.y);
    }
}