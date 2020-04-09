class Log extends Object {
    constructor(spec, laneHeight, width) {
        super(spec.lane, spec.obj(), spec.moveRate, spec.start, laneHeight, width);
        this.type = 'log';
    }

    get center() {
        return this._center;
    }

    get size() {
        return this._size;
    }

    update(elapsedTime, width) {
        this.updateObj(elapsedTime, width);
    }

    render(drawSprite) {
        this.renderObj(drawSprite);
    }

    handleCollision(elapsedTime, frog, width) {
        if (this.rotation == 0) {
            frog.center.x += (width / this.moveRate) * elapsedTime;
        }
        else {
            frog.center.x -= (width / this.moveRate) * elapsedTime;
        }
        return true;
    }
}