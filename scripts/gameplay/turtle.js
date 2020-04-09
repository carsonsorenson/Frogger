class Turtle extends Object {
    constructor(spec, laneHeight, width) {
        super(spec.lane, spec.obj()[0], spec.moveRate, spec.start, laneHeight, width);
        this.type = 'turtle';

        this.numTurtles = Math.floor(Math.random() * (2) + 2);
        this.turtleImages = spec.obj();
        this.changeTime = 75;
        this.elapsed = 0;
        this.index = 0;

        this.turtles = [];
        for (let i = 0; i < this.numTurtles; i++) {
            this.turtles.push({
                turtleCenter: {
                    x: this._center.x + (this._size.width * i * 0.92),
                    y: this._center.y
                },
                index: i,
                elapsed: 0
            });
        }
    }

    get center() {
        let left = this.turtles[0].turtleCenter.x - (this._size.width / 2);
        let right = this.turtles[this.turtles.length -1].turtleCenter.x + (this._size.width / 2);
        return {
            x: (left + right) / 2,
            y: this._center.y
        }
    }

    get size() {
        let left = this.turtles[0].turtleCenter.x - (this._size.width / 2);
        let right = this.turtles[this.turtles.length -1].turtleCenter.x + (this._size.width / 2);
        return {
            width: (right - left),
            height: this._size.height
        };
    }

    update(elapsedTime, width) {
        for (let i = 0; i < this.numTurtles; i++) {
            this.turtles[i].elapsed += elapsedTime;
            this.turtles[i].turtleCenter.x = this._center.x + (this._size.width * i * 0.92);
            this.turtles[i].turtleCenter.y = this._center.y;
            if (this.turtles[i].elapsed > this.changeTime) {
                this.turtles[i].elapsed = 0;
                this.turtles[i].index = (this.turtles[i].index + 1) % this.turtleImages.length;
            }
        }
        this.updateObj(elapsedTime, width);
    }

    render(drawSprite) {
        for (let i = 0; i < this.turtles.length; i++) {
            this.renderObj(drawSprite, this.turtles[i].turtleCenter, this.turtleImages[this.turtles[i].index]);
        }
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