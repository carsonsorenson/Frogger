class GameStatus {
    constructor(sprites, laneHeight, numRows, persistence) {
        this.numRows = numRows;
        this.numLives = 3;
        this.frogImage = sprites.getFrogs()[13];
        this.laneHeight = laneHeight;

        this.totalTime = 60000;
        this.remainingTime = this.totalTime;

        this.score = 0;
        this.highScore = persistence.highScore;

        this.isDead = false;
        this.deadTime = 2000;
        this.deadElapsed = 0;
        this.deadImg = sprites.getDeath();
        this.deadCenter;

        this.setDimensions(this.laneHeight);
    }

    updateScore(amount) {
        this.score += amount;
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
    }

    won() {
        console.log('I won');
        this.updateScore(1000);
    }

    forwardStep() {
        this.updateScore(10);
    }

    safeArrival() {
        console.log('Safe arrival');
        // arriving safely home gets 50 points
        this.updateScore(50);

        // 10 points per each unused 1/2 second of time
        let leftOverTime = Math.ceil(this.remainingTime / 1000);
        this.updateScore(10 * (2 * leftOverTime));
    }

    caughtFly() {
        this.updateScore(200);
    }

    lost(center) {
        this.numLives--;
        this.deadCenter = center;
        this.isDead = true;
    }

    reset() {
        this.remainingTime = this.totalTime;
    }

    update(elapsedTime) {
        this.remainingTime -= elapsedTime;
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
        if (this.isDead) {
            this.deadElapsed += elapsedTime;
            if (this.deadElapsed > this.deadTime) {
                this.deadElapsed = 0;
                this.isDead = false;
            }
        }
    }


    render(renderer, topRow) {
        renderer.frogLives.render(this.frogImage, this.numLives, this.center, this.size);
        renderer.timeBar.render(this.remainingTime, this.totalTime, this.laneHeight);
        renderer.score.render(topRow, this.score, this.highScore);
        if (this.isDead) {
            renderer.death.render(this.deadImg, this.deadCenter, this.laneHeight);
        }
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