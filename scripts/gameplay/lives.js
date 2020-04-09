class Lives {
    constructor(sprites, laneHeight, numRows) {
        this.numLives = 3;
        this.numRows = numRows;
        this.image = sprites()[13];
        this.laneHeight = laneHeight;

        this.setDimensions(this.laneHeight);

    }

    lost() {
        this.numLives--;
    }

    render(drawSprite) {
        for (let i = 0; i < this.numLives; i++) {
            drawSprite(
                this.image,
                {
                    x: (this.size.width / 2) + (this.laneHeight * i * 0.6),
                    y: this.laneHeight * (this.numRows - 1)
                },
                this.size
            )
        }
    }

    setDimensions(laneHeight) {
        this.laneHeight = laneHeight;
        this.size = {
            width: this.laneHeight * 0.8,
            height: this.laneHeight * 0.8
        }
    }


}