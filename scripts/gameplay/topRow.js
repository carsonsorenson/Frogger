class TopRow {
    constructor(sprites, laneHeight, width, rows) {
        this.sprites = sprites;
        this.laneHeight = laneHeight;
        this.laneWidth = width / rows;
        this.numCols = rows;

        this.bushImage = this.sprites.getBush();
        this.lillyImage = this.sprites.getBushWithLillyPad();
        this.objects = [];
        this.numFrogs = 0;
    
        for (let i = 0; i < this.numCols; i++) {
            if ((i - 1) % 3 == 0) {
                this.objects.push({
                    type: 'lilly',
                    image: this.lillyImage,
                    frog: null
                });
            }
            else {
                this.objects.push({
                    type: 'bush',
                    image: this.bushImage,
                });
            }
            this.objects[i].center = {
                x: i * this.laneWidth + (this.laneWidth / 2),
                y: this.laneHeight / 2
            };
        }
    }

    update(elapsedTime) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].frog) {
                this.objects[i].frog.updateSprite(elapsedTime);
            }
        }
    }

    render(drawSprite) {
        for (let i = 0; i < this.numCols; i++) {
            drawSprite(
                this.objects[i].image,
                this.objects[i].center,
                {width: this.laneWidth + 1, height: this.laneWidth}
            )
            if (this.objects[i].frog) {
                this.objects[i].frog.render(drawSprite);
            }
        }
    }

    resize(laneHeight, width, newWidth) {
        this.laneWidth = newWidth / this.numCols;
        this.laneHeight = laneHeight;
        for (let i = 0; i < this.numCols; i++) {
            this.objects[i].center.x = i * this.laneWidth + (this.laneWidth / 2);
            this.objects[i].center.y = this.laneHeight / 2;
            if (this.objects[i].frog) {
                this.objects[i].frog.setDimensions(laneHeight, width, newWidth)
            }
        }
    }
}