class Frog {
    constructor(images, laneWidth, laneHeight, rowNum) {
        this.images = images;
        this.laneWidth = laneWidth;
        this.laneHeight = laneHeight;
        this.laneNumber = rowNum;
        this.center = {
            x: this.laneWidth / 2 * 3,
            y: this.laneHeight * this.laneNumber + (this.laneHeight / 2)
        };
        this.size = {
            width: this.laneHeight,
            height: this.laneHeight
        };

        this.index = 21;
        this.moving = false;
        this.alive = true;
        this.direction;
        this.newPos;

        this.cycleTime = 150;
        this.elapsedTime = 0;
    }

    moveRight(elapsedTime) {
        if (!this.moving && this.center.x < (this.laneWidth * 14)) {
            this.index = 6;
            this.moving = true;
            this.direction = 'right';
            this.newPos = this.center.x + this.laneHeight;
        }
    }

    moveLeft(elapsedTime) {
        if (!this.moving && this.center.x > this.laneWidth) {
            this.index = 3;
            this.moving = true;
            this.direction = 'left';
            this.newPos = this.center.x - this.laneHeight;
        }
    }

    moveDown(elapsedTime) {
        if (!this.moving && this.laneNumber < 14) {
            this.index = 0;
            this.moving = true;
            this.direction = 'down';
            this.newPos = this.center.y + this.laneHeight;
            this.laneNumber++;
        }
    }

    moveUp(elapsedTime) {
        if (!this.moving) {
            this.index = 9;
            this.moving = true;
            this.direction = 'up';
            this.newPos = this.center.y - this.laneHeight;
            this.laneNumber--;
        }
    }

    update(elapsedTime) {
        // move across cell in 2/10 of a second
        let moveRate = this.laneHeight / 200 * elapsedTime;

        if (this.moving) {
            if (this.direction == 'right') {
                this.center.x += moveRate;
                if (this.center.x > this.newPos) {
                    this.moving = false;
                    this.center.x = this.newPos;
                    this.index = 18;
                }
            }
            else if (this.direction == 'left') {
                this.center.x -= moveRate;
                if (this.center.x < this.newPos) {
                    this.moving = false;
                    this.center.x = this.newPos;
                    this.index = 15;
                }
            }
            else if (this.direction == 'down') {
                this.center.y += moveRate;
                if (this.center.y > this.newPos) {
                    this.moving = false;
                    this.center.y = this.newPos;
                    this.index = 12;
                }
            }
            else if (this.direction == 'up') {
                this.center.y -= moveRate;
                if (this.center.y < this.newPos) {
                    this.moving = false;
                    this.center.y = this.newPos;
                    this.index = 21;
                }
            }
        }

        this.elapsedTime += elapsedTime;
        if (this.elapsedTime > this.cycleTime && !this.moving) {
            this.elapsedTime = 0;
            this.index = this.index + 1;
            if (this.index % 3 == 0) {
                this.index -= 3;
            }
        }
    }

    render(drawSprite) {
        drawSprite(
            this.images[this.index],
            this.center,
            this.size
        )
    }
}