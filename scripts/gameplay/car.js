class Car {
    constructor(spec, laneHeight) {
        this.car = spec.obj();
        this.moveRate = spec.moveRate;
        this.center = {...spec.center};
        this.rotation = spec.rotation;
        this.laneNumber = spec.laneNumber;

        this.setSize(laneHeight);
    }

    setSize(laneHeight) {
        let scalingFactor = laneHeight / this.car.height;
        this.size = {
            width: this.car.width * scalingFactor,
            height: this.car.height * scalingFactor
        }
    }

    setCenter(x, y) {
        this.center.x = x;
        this.center.y = y;
    }

    update(elapsedTime, width) {
        if (this.rotation == 0) {
            this.center.x += (width / this.moveRate) * elapsedTime;
        }
        else {
            this.center.x -= (width / this.moveRate) * elapsedTime;
        }
    }

    getSize() {
        return this.size;
    }

    getCenter() {
        return this.center;
    }

    render(drawSprite) {
        drawSprite(
            this.car,
            this.center,
            this.size,
            this.rotation
        );
    }
}