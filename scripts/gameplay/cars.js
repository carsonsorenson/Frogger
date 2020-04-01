class Car {
    constructor(graphics, sprites, lane, moveRate, numLanes, width, height) {
        this.graphics = graphics;
        this.sprites = sprites;

        this.lane = lane;
        this.moveRate = moveRate;
        this.laneHeight = height / numLanes;

        let y = lane * (height / numLanes) + (this.laneHeight / 2);
        
        if (this.lane == 8 || this.lane == 11) {
            this.car = sprites.getSemi();
        }
        else if (this.lane == 9) {
            this.car = sprites.getFireTruck();
        }
        else {
            this.car = sprites.getRandomCar();
        }

        if (this.lane == 8 || this.lane == 10 || this.lane == 12) {
            this.rotation = Math.PI;
            this.center = {x: width, y: y};
        }
        else {
            this.rotation = 0;
            this.center = {x: 0, y: y};
        }

        this.scalingFactor = this.laneHeight / this.car.height;
        this.size = {width: this.car.width * this.scalingFactor, height: this.car.height * this.scalingFactor};
    }

    update(elapsedTime) {
        if (this.rotation == 0) {
            this.center.x += this.moveRate * elapsedTime;
        }
        else {
            this.center.x -= this.moveRate * elapsedTime;
        }
    }

    render() {
        this.graphics.drawSprite(
            this.car,
            this.center,
            this.size,
            this.rotation
        );
    }
}