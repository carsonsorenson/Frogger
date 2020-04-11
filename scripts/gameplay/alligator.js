class Alligator extends Object {
    constructor(spec, laneHeight, width) {
        super(spec.lane, spec.obj()[1], spec.moveRate, spec.respawnRate, spec.start, laneHeight, width);
        this.type = 'alligator';

        this.images = spec.obj();
        this.elapsed = 0;
        this.updateTime = 3000;
        this.index = 0;
        this.image = this.images[this.index];
    }

    get center() {
        return this._center;
    }

    get size() {
        return this._size;
    }

    update(elapsedTime, width) {
        this.elapsed += elapsedTime;
        if (this.elapsed > this.updateTime) {
            this.elapsed = 0;
            this.index = (this.index + 1) % this.images.length;
            this.image = this.images[this.index];
        }
        this.updateObj(elapsedTime, width);
    }

    render(drawSprite) {
        this.renderObj(drawSprite, this._center, this.images[this.index]);
    }

    handleCollision(elapsedTime, frog, width) {
        if (this.rotation == 0) {
            frog.center.x += (width / this.moveRate) * elapsedTime;
        }
        else {
            frog.center.x -= (width / this.moveRate) * elapsedTime;
        }

        let dist = frog.center.x - this.center.x;
        return dist < 0;
    }
}