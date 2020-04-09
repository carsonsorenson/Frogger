class GameStatus {
    constructor(sprites, laneHeight, numRows) {
        this.numLives = 3;
        this.numRows = numRows;
        this.frogImage = sprites()[13];
        this.laneHeight = laneHeight;

        this.setDimensions(this.laneHeight);

    }

    lost() {
        this.numLives--;
    }

    render(renderer) {
        renderer.frogLives.render(this.frogImage, this.numLives, this.center, this.size);
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