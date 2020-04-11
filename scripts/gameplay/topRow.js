class TopRow {
    constructor(sprites, laneHeight, width, rows, gameStatus) {
        this.sprites = sprites;
        this.laneHeight = laneHeight;
        this.laneWidth = width / rows;
        this.numCols = rows;
        this.gameStatus = gameStatus;

        this.bushImage = this.sprites.getBush();
        this.lillyImage = this.sprites.getBushWithLillyPad();
        this.objects = [];
        this.numFrogs = 0;

        this.flyImage = sprites.getFly();
        this.flyCheck = 7000;
        this.flyElapsed = this.flyCheck;
        this.flyProbablity = 0.5;
        this.flyTime = 6000;
    
        for (let i = 0; i < this.numCols; i++) {
            if ((i - 1) % 3 == 0) {
                this.objects.push({
                    type: 'lilly',
                    image: this.lillyImage,
                    frog: null,
                    fly: false,
                    flyElapsed: 0
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

    checkToAddFly() {
        if (Math.random() < this.flyProbablity) {
            let indices = [];
            for (let i = 0; i < this.numCols; i++) {
                indices.push(i);
            }
            let curIndex = this.numCols;
            while (curIndex !== 0) {
                let randomIndex = Math.floor(Math.random() * curIndex);
                curIndex--;

                let tmp = indices[curIndex];
                indices[curIndex] = indices[randomIndex];
                indices[randomIndex] = tmp;
            }
            for (let i = 0; i < this.numCols; i++) {
                let obj = this.objects[indices[i]];
                if (obj.type === 'lilly' && !obj.fly && !obj.frog) {
                    obj.fly = true;
                    break;
                }
            }
        }
    }

    update(elapsedTime) {
        this.flyElapsed += elapsedTime;
        if (this.flyElapsed > this.flyCheck) {
            this.flyElapsed = 0;
            this.checkToAddFly();
        }

        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].frog) {
                this.objects[i].frog.updateSprite(elapsedTime);
                if (this.objects[i].fly) {
                    this.objects[i].fly = false;
                    this.objects[i].flyElapsed = 0;
                    this.gameStatus.caughtFly();
                }
            }
            else if (this.objects[i].fly) {
                this.objects[i].flyElapsed += elapsedTime;
                if (this.objects[i].flyElapsed > this.flyTime) {
                    this.objects[i].flyElapsed = 0;
                    this.objects[i].fly = false;
                }
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
            if (this.objects[i].fly) {
                drawSprite(
                    this.flyImage,
                    this.objects[i].center,
                    {width: this.laneWidth * 0.8, height: this.laneWidth * 0.8}
                );
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