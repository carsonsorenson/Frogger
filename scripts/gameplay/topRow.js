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
        this.alligatorImage = sprites.getAlligatorHead();

        this.check = 7000;
        this.elapsed = this.check;
        this.probability = 0.4;
        this.time = 6000;

    
        for (let i = 0; i < this.numCols; i++) {
            if ((i - 1) % 3 == 0) {
                this.objects.push({
                    type: 'lilly',
                    image: this.lillyImage,
                    frog: null,
                    fly: false,
                    alligator: false,
                    elapsed: 0
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

    checkToAddObject() {
        let type = null;
        let r = Math.random();
        if (r < this.probability) {
            type = 'fly';
        }
        else if (r < this.probability * 2) {
            type = 'alligator';
        }

        type = 'alligator';

        if (type !== null) {
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
                if (obj.type === 'lilly' && !obj.frog) {
                    if (type === 'fly') {
                        obj.fly = true;
                    }
                    else if (type === 'alligator') {
                        obj.alligator = true;
                    }
                    break;
                }
            }
        }
    }

    update(elapsedTime) {
        this.elapsed += elapsedTime;
        if (this.elapsed > this.check) {
            this.elapsed = 0;
            this.checkToAddObject();
        }

        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].frog) {
                this.objects[i].frog.updateSprite(elapsedTime);
                if (this.objects[i].fly) {
                    this.objects[i].fly = false;
                    this.objects[i].elapsed = 0;
                    this.gameStatus.caughtFly();
                }
                else if (this.objects[i].alligator) {
                    this.objects[i].alligator = false;
                    this.objects[i].elapsed = 0;
                }
            }
            else if (this.objects[i].fly || this.objects[i].alligator) {
                this.objects[i].elapsed += elapsedTime;
                if (this.objects[i].elapsed > this.time) {
                    this.objects[i].elapsed = 0;
                    this.objects[i].fly = false;
                    this.objects[i].alligator = false;
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
                    {x: this.objects[i].center.x, y: this.objects[i].center.y * 1.4},
                    {width: this.laneWidth * 0.8, height: this.laneWidth * 0.8}
                );
            }
            else if (this.objects[i].alligator) {
                drawSprite(
                    this.alligatorImage,
                    this.objects[i].center,
                    {width: this.laneWidth * 0.9, height: this.laneWidth * 0.9}
                )
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