class Frog {
    constructor(obj, laneHeight, width) {
        this.images = obj();
        this.laneHeight = laneHeight;
        this.lane = 13;

        this.center = {
            x: width / 2,
            y: this.laneHeight * this.lane + (this.laneHeight / 2)
        };

        this.size = {
            width: this.laneHeight,
            height: this.laneHeight
        };

        this.index = 21;
        this.moving = false;
        this.alive = true;
        this.finished = false;
        this.direction;
        this.newPos;

        this.cycleTime = 180;
        this.elapsedTime = 0;
    }

    moveRight(elapsedTime) {
        if (!this.moving) {
            this.index = 6;
            this.moving = true;
            this.direction = 'right';
            this.newPos = this.center.x + this.laneHeight;
        }
    }

    moveLeft(elapsedTime) {
        if (!this.moving) {
            this.index = 3;
            this.moving = true;
            this.direction = 'left';
            this.newPos = this.center.x - this.laneHeight;
        }
    }

    moveDown(elapsedTime) {
        if (!this.moving && this.lane < 14) {
            this.index = 0;
            this.moving = true;
            this.direction = 'down';
            this.newPos = this.center.y + this.laneHeight;
            this.lane++;
        }
    }

    moveUp(elapsedTime) {
        if (!this.moving && this.lane > 0) {
            this.index = 9;
            this.moving = true;
            this.direction = 'up';
            this.newPos = this.center.y - this.laneHeight;
            this.lane--;
        }
    }

    updateMovement(elapsedTime) {
        // move across cell in 2/10 of a second
        let moveRate = this.laneHeight / 150 * elapsedTime;

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

    checkCollision(elapsedTime, objects, width, topRow) {
        let collidedWith = null;
        let myLeft = this.center.x - (this.size.width / 2);
        let myRight = this.center.x + (this.size.width / 2);

        if (this.lane !== 0) {
            for (let i = 0; i < objects.length; i++) {
                if (!this.moving && objects[i].lane === this.lane) {
                    let left = objects[i].center.x - (objects[i].size.width / 2);
                    let right = objects[i].center.x + (objects[i].size.width / 2);

                    if (objects[i].type !== 'car') {
                        left += (this.size.width / 2);
                        right -= (this.size.width / 2);
                    }


                    if (myLeft < right && myRight > left) {
                        collidedWith = objects[i].type;
                        this.alive = objects[i].handleCollision(elapsedTime, this, width);
                    }
                }
            }

            if (collidedWith === null && this.lane >= 1 && this.lane <= 5) {
                this.alive = false;
            }
        }
        else {
            this.alive = false;
            for (let i = 0; i < topRow.objects.length; i++) {
                let delta = topRow.objects[i].center.x;
                let diff = Math.abs(this.center.x - delta);

                if (diff < (this.size.width / 2) && topRow.objects[i].type === 'lilly' && topRow.objects[i].frog === null) {
                    this.finished = true;
                    this.center.x = topRow.objects[i].center.x;
                    this.center.y = topRow.objects[i].center.y;
                    this.index = 12;
                    topRow.numFrogs++;
                    topRow.objects[i].frog = this;
                }
            }
        }
    }

    update(elapsedTime, objects, width, topRow) {
        if (this.moving) {
            this.updateMovement(elapsedTime);
        }
        if (!this.moving) {
            this.checkCollision(elapsedTime, objects, width, topRow);
        }
        this.updateSprite(elapsedTime);
    }

    updateSprite(elapsedTime) {
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

    setDimensions(laneHeight, width, newWidth) {
        this.size.width = laneHeight
        this.size.height = laneHeight;

        this.center.y = this.lane * laneHeight + (laneHeight / 2);
        this.center.x = newWidth * (this.center.x / width);

        this.laneHeight = laneHeight;
    }
}