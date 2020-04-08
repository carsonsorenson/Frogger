class TopRow {
    constructor(sprites, laneHeight, laneWidth, numCols) {
        this.sprites = sprites;
        this.laneHeight = laneHeight;
        this.laneWidth = laneWidth;
        this.numCols = numCols;

        this.bushImage = this.sprites.getBush();
        this.lillyImage = this.sprites.getBushWithLillyPad();
        this.objects = [];
        for (let i = 0; i < this.numCols; i++) {
            if ((i - 1) % 3 == 0) {
                this.objects.push({
                    image: this.lillyImage
                });
            }
            else {
                this.objects.push({
                    image: this.bushImage
                });
            }
            this.objects[i].center = {
                x: i * this.laneWidth + (this.laneWidth / 2),
                y: this.laneHeight / 2
            };
        }
    }

    render(drawSprite) {
        for (let i = 0; i < this.numCols; i++) {
            drawSprite(
                this.objects[i].image,
                this.objects[i].center,
                {width: this.laneWidth + 1, height: this.laneWidth}
            )
        }
    }

    resize(laneWidth, laneHeight) {
        this.laneWidth = laneWidth;
        this.laneHeight = laneHeight;
        for (let i = 0; i < this.numCols; i++) {
            this.objects[i].center.x = i * this.laneWidth + (this.laneWidth / 2);
            this.objects[i].center.y = this.laneHeight / 2;
        }
    }
}