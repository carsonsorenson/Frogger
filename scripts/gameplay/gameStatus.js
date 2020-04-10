class GameStatus {
    constructor(sprites, laneHeight, numRows) {
        this.numRows = numRows;
        this.numLives = 3;
        this.frogImage = sprites()[13];
        this.laneHeight = laneHeight;

        this.totalTime = 60000;
        this.remainingTime = this.totalTime;

        this.setDimensions(this.laneHeight);

    }

    lost() {
        this.numLives--;
    }

    update(elapsedTime) {
        this.remainingTime -= elapsedTime;
    }


    render(renderer) {
        renderer.frogLives.render(this.frogImage, this.numLives, this.center, this.size);
        renderer.timeBar.render(this.remainingTime, this.totalTime, this.laneHeight);
    }

    setDimensions(laneHeight) {
        this.laneHeight = laneHeight;
        this.size = {
            width: this.laneHeight * 0.8,
            height: this.laneHeight * 0.8
        }
        this.center = {
            x: this.size.width / 2,
            y: this.laneHeight * (this.numRows - 1)
        }
    }


}