class Log {
    constructor(spec, laneHeight) {
        this.type = 'log';
        this.log = spec.obj();
        this.moveRate = spec.moveRate;
        this.center = {...spec.center};
        this.rotation = spec.rotation;
        this.laneNumber = spec.laneNumber;

        this.setSize(laneHeight);
    }

    setSize(laneHeight) {
        let scalingFactor = laneHeight / this.log.height;
        this.size = {
            width: this.log.width * scalingFactor,
            height: this.log.height * scalingFactor
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

    updateFrog(elapsedTime, width, frog) {
        if (!frog.moving) {
            if (this.rotation == 0) {
                frog.center.x += (width / this.moveRate) * elapsedTime;
            }
            else {
                frog.center.x -= (width / this.moveRate) * elapsedTime;
            }
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
            this.log,
            this.center,
            this.size,
            this.rotation
        );
    }
}