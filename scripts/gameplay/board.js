class Board {
    constructor(numRows, graphics, objects, keyBindings) {
        this.numRows = numRows;
        this.objects = objects;
        this.setDimensions(graphics)
        window.addEventListener('resize', () => this.setDimensions(MyGame.graphics));

        this.drawSprite = graphics.drawSprite;
        this.objects = [];
        this.sprites = objects.sprites;
        this.topRow = new TopRow(this.sprites, this.laneHeight, this.width, this.numRows);
        this.frog = new Frog(this.sprites.getFrogs, this.laneHeight, this.width);
        this.lives = new Lives(this.sprites.getFrogs, this.laneHeight, this.numRows);

        this.lanes = [
            {lane: 1, constructor: Log, moveRate: 10000, respawnRate: 5000, obj: this.sprites.getMediumLog, start: 'left'},
            {lane: 2, constructor: Turtle, moveRate: 10000, respawnRate: 4000, obj: this.sprites.getTurtles, start: 'right'},
            {lane: 3, constructor: Log, moveRate: 10000, respawnRate: 5000, obj: this.sprites.getLongLog, start: 'left'},
            {lane: 4, constructor: Log, moveRate: 14000, respawnRate: 6000, obj: this.sprites.getShortLog, start: 'left'},
            {lane: 5, constructor: Turtle, moveRate: 10000, respawnRate: 4000, obj: this.sprites.getTurtles, start: 'right'},
            {lane: 8, constructor: Car, moveRate: 10000, respawnRate: 5000, obj: this.sprites.getSemi, start: 'right'},
            {lane: 9, constructor: Car, moveRate: 8000, respawnRate: 4000, obj: this.sprites.getFireTruck, start: 'left'},
            {lane: 10, constructor: Car, moveRate: 6000, respawnRate: 3000, obj: this.sprites.getRandomCar, start: 'right'},
            {lane: 11, constructor: Car, moveRate: 10000, respawnRate: 5000, obj: this.sprites.getSemi, start: 'left'},
            {lane: 12, constructor: Car, moveRate: 8000, respawnRate: 3000, obj: this.sprites.getRandomCar, start: 'right'},
        ];

        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].elapsedTime = Math.floor(Math.random() * this.lanes[i].respawnRate);
        }

        this.bindings = {
            [keyBindings.left]: (elapsedTime) => this.frog.moveLeft(elapsedTime),
            [keyBindings.up]: (elapsedTime) => this.frog.moveUp(elapsedTime),
            [keyBindings.right]: (elapsedTime) => this.frog.moveRight(elapsedTime),
            [keyBindings.down]: (elapsedTime) => this.frog.moveDown(elapsedTime)
        }
    }

    processInput(key, elapsedTime) {
        if (key in this.bindings) {
            this.bindings[key](elapsedTime);
        }
    }

    render() {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].render(this.drawSprite);
        }
        this.topRow.render(this.drawSprite);
        this.frog.render(this.drawSprite);
        this.lives.render(this.drawSprite);
    }

    spawnObjects(elapsedTime) {
        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].elapsedTime += elapsedTime;
            if (this.lanes[i].elapsedTime > this.lanes[i].respawnRate) {
                this.lanes[i].elapsedTime = 0;
                const obj = new this.lanes[i].constructor(this.lanes[i], this.laneHeight, this.width);
                this.objects.push(obj);
            }
        }
    }

    updateObjects(elapsedTime) {
        for (let i = this.objects.length - 1; i >= 0; i--) {
            let x = this.objects[i].center.x;
            let w = this.objects[i].size.width;
            let start = this.objects[i].start;
            if ((x < 0 - (w / 2) && start == 'right') || (x > this.width + (w / 2) && start == 'left')) {
                this.objects.splice(i, 1);
            }
            else {
                this.objects[i].update(elapsedTime, this.width);
            }
        }
    }

    update(elapsedTime) {
        this.spawnObjects(elapsedTime);
        this.updateObjects(elapsedTime);

        this.topRow.update(elapsedTime);
        this.frog.update(elapsedTime, this.objects, this.width, this.topRow);

        if (!this.frog.alive) {
            if (!this.frog.finished) {
                this.lives.lost();
            }
            this.frog = new Frog(this.sprites.getFrogs, this.laneHeight, this.width);
        }
    }

    setDimensions(graphics) {
        this.laneHeight = graphics.height / this.numRows;
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].setDimensions(this.laneHeight, this.width, graphics.width);
        }
        if (this.frog) {
            this.frog.setDimensions(this.laneHeight, this.width, graphics.width);
        }
        if (this.topRow) {
            this.topRow.resize(this.laneHeight, this.width, graphics.width);
        }
        if (this.lives) {
            this.lives.setDimensions(this.laneHeight);
        }
        this.width = graphics.width;
        this.height = graphics.height;
    }
}