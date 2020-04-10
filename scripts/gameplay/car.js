class Car extends Object {
    constructor(spec, laneHeight, width) {
        super(spec.lane, spec.obj(), spec.moveRate, spec.respawnRate, spec.start, laneHeight, width);
        this.type = 'car';
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

    handleCollision(frog) {
        return false;
    }
}