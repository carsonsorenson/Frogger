class Frog {
    constructor(images, laneWidth, laneHeight, rowNum) {
        this.images = images;
        this.laneWidth = laneWidth;
        this.laneHeight = laneHeight;
        this.center = {
            x: this.laneWidth,
            y: this.laneHeight * numRows
        }
        this.moveRate = 1000;
        this.index = 0;
    }

    render(drawSprite) {
        drawSprite(
            this.images[this.index],
            this.center,
            {width: this.laneHeight, height: this.laneHeight}
        )
    }
}