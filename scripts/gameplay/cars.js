class Car {
    constructor(spec, laneHeight, width) {
        this.car = spec.obj();
        this.center = {...spec.center};
        this.rotation = spec.rotation;
        this.origMoveRate = spec.moveRate;
        this.moveRate = width / this.origMoveRate;
        this.laneNumber = spec.laneNumber;

        let scalingFactor = laneHeight / this.car.height;
        this.size = {
            width: this.car.width * scalingFactor,
            height: this.car.height * scalingFactor
        };
    }

    update(elapsedTime) {
        if (this.rotation == 0) {
            this.center.x += this.moveRate * elapsedTime;
        }
        else {
            this.center.x -= this.moveRate * elapsedTime;
        }
    }

    render(drawSprite) {
        drawSprite(
            this.car,
            this.center,
            this.size,
            this.rotation
        );
    }

    resize(width, laneHeight) {
        this.moveRate = width / this.origMoveRate;
        let scalingFactor = laneHeight / this.car.height;
        this.size = {
            width: this.car.width * scalingFactor,
            height: this.car.height * scalingFactor
        };
    }
}
