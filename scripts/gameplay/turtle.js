class Turtle {
    constructor(spec, laneHeight) {
        this.type = 'turtle';
        this.numTurtles = Math.floor(Math.random() * (2) + 2);
        this.moveRate = spec.moveRate;
        this.turtles = [];
        this.center = {...spec.center};
        this.rotation = spec.rotation;
        this.laneNumber = spec.laneNumber;
        this.turtleImages = spec.obj();
        this.changeTime = 75;

        this.setSize(laneHeight);

        for (let i = 0; i < this.numTurtles; i++) {
            let center = {x: null, y: null};
            center.x = this.center.x + (this.size.width * i * 0.92);
            center.y = this.center.y;
            this.turtles.push({center, index: i, elapsed: 0});
        }
    }

    setSize(laneHeight) {
        let scalingFactor = laneHeight / this.turtleImages[0].height;
        this.size = {
            width: this.turtleImages[0].width * scalingFactor,
            height: this.turtleImages[0].height * scalingFactor,
        }
    }

    setCenter(x, y) {
        for (let i = 0; i < this.numTurtles; i++) {
            this.turtles[i].center.x = x + (this.size.width * i * 0.92);
            this.turtles[i].center.y = y
        }
    }

    update(elapsedTime, width) {
        for (let i = 0; i < this.numTurtles; i++) {
            this.turtles[i].elapsed += elapsedTime;
            if (this.rotation == 0) {
                this.turtles[i].center.x += (width / this.moveRate) * elapsedTime;
            }
            else {
                this.turtles[i].center.x -= (width / this.moveRate) * elapsedTime;
            }
            if (this.turtles[i].elapsed > this.changeTime) {
                this.turtles[i].elapsed = 0;
                this.turtles[i].index = (this.turtles[i].index + 1) % this.turtleImages.length;
            }
        }
    }

    updateFrog(elapsedTime, width, frog) {
        if (this.rotation == 0) {
            frog.center.x += (width / this.moveRate) * elapsedTime;
        }
        else {
            frog.center.x -= (width / this.moveRate) * elapsedTime;
        }
    }

    getSize() {
        return this.size;
    }

    getCenter() {
        if (this.turtles[0].center.x > 0) {
            return this.turtles[0].center;
        }
        return this.turtles[this.numTurtles - 1].center;
    }

    render(drawSprite) {
        for (let i = 0; i < this.numTurtles; i++) {
            drawSprite(
                this.turtleImages[this.turtles[i].index],
                this.turtles[i].center,
                this.size,
                this.rotation
            );
        }
    }
}