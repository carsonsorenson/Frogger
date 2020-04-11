class Board {
    constructor(numRows, graphics, objects, renderer, persistence) {
        this.numRows = numRows;
        this.objects = objects;
        this.renderer = renderer;
        this.setDimensions(graphics)
        window.addEventListener('resize', () => this.setDimensions(MyGame.graphics));

        this.drawSprite = graphics.drawSprite;
        this.objects = [];
        this.sprites = objects.sprites;
        this.frog = new Frog(this.sprites.getFrogs, this.laneHeight, this.width);
        this.gameStatus = new GameStatus(this.sprites, this.laneHeight, this.numRows, persistence);
        this.topRow = new TopRow(this.sprites, this.laneHeight, this.width, this.numRows, this.gameStatus);
        this.visited = this.frog.lane;
        this.alligatorFrequency = 0.5;
        this.gameOverMessage = "";

        this.lanes = [
            {lane: 1, constructor: 'logOrAlligator', moveRate: 11000, respawnRate: 5000, start: 'left'},
            {lane: 2, constructor: Turtle, moveRate: 10000, respawnRate: 4000, obj: this.sprites.getTurtles, obj2: this.sprites.getTurtlesDiving, start: 'right'},
            {lane: 3, constructor: Log, moveRate: 9000, respawnRate: 5000, obj: this.sprites.getLongLog, start: 'left'},
            {lane: 4, constructor: Log, moveRate: 14000, respawnRate: 6000, obj: this.sprites.getShortLog, start: 'left'},
            {lane: 5, constructor: Turtle, moveRate: 10000, respawnRate: 4000, obj: this.sprites.getTurtles, obj2: this.sprites.getTurtlesDiving, start: 'right'},
            {lane: 8, constructor: Car, moveRate: 13000, respawnRate: 7000, obj: this.sprites.getSemi, start: 'right'},
            {lane: 9, constructor: Car, moveRate: 9000, respawnRate: 4000, obj: this.sprites.getFireTruck, start: 'left'},
            {lane: 10, constructor: Car, moveRate: 7000, respawnRate: 3500, obj: this.sprites.getRandomCar, start: 'right'},
            {lane: 11, constructor: Car, moveRate: 16000, respawnRate: 9000, obj: this.sprites.getSemi, start: 'left'},
            {lane: 12, constructor: Car, moveRate: 13000, respawnRate: 6000, obj: this.sprites.getRandomCar, start: 'right'},
        ];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < this.lanes.length; j++) {
                this.objects.push(this.constructLane(this.lanes[j], this.laneHeight, this.width));
            }
            for (let j = 0; j < this.objects.length; j++) {
                let rate = this.objects[j].respawnRate;
                this.objects[j].update(rate, this.width);
            }
        }

        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].elapsedTime = this.lanes[i].respawnRate;
        }

        this.bindings = {
            [persistence.keyBindings.left]: (elapsedTime) => this.frog.moveLeft(elapsedTime),
            [persistence.keyBindings.up]: (elapsedTime) => this.frog.moveUp(elapsedTime),
            [persistence.keyBindings.right]: (elapsedTime) => this.frog.moveRight(elapsedTime),
            [persistence.keyBindings.down]: (elapsedTime) => this.frog.moveDown(elapsedTime)
        }
    }

    constructLane(spec, laneHeight, width) {
        if (spec.constructor === 'logOrAlligator') {
            if (Math.random() < this.alligatorFrequency) {
                spec.obj = this.sprites.getAlligator;
                return new Alligator(spec, laneHeight, width);
            }
            else {
                spec.obj = this.sprites.getMediumLog;
                return new Log(spec, laneHeight, width);
            }
        }
        else {
            return new spec.constructor(spec, laneHeight, width);
        }
    }

    gameOver() {
        if (this.topRow.numFrogs === 5) {
            this.gameStatus.won();
            return true;
        }
        else if (this.gameStatus.numLives === 0) {
            return true;
        }
        else if (this.gameStatus.remainingTime <= 0) {
            return true;
        }
        return false;
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
        this.gameStatus.render(this.renderer, this.topRow);
    }

    spawnObjects(elapsedTime) {
        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].elapsedTime += elapsedTime;
            if (this.lanes[i].elapsedTime > this.lanes[i].respawnRate) {
                this.lanes[i].elapsedTime = 0;
                this.objects.push(this.constructLane(this.lanes[i], this.laneHeight, this.width));
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
        this.gameStatus.update(elapsedTime);

        if (!this.frog.alive) {
            if (!this.frog.finished) {
                this.gameOverMessage = "GAME OVER";
                this.gameStatus.lost(this.frog.center);
            }
            else {
                this.gameOverMessage = "YOU WON!";
                this.gameStatus.safeArrival();
            }
            this.frog = new Frog(this.sprites.getFrogs, this.laneHeight, this.width);
            this.gameStatus.reset();
            this.visited = this.frog.lane;
        }

        if (this.frog.lane < this.visited && !this.frog.moving) {
            this.gameStatus.forwardStep();
            this.visited = this.frog.lane;
        }
    }

    setDimensions(graphics) {
        this.laneHeight = graphics.height / this.numRows;
        this.laneWidth = graphics.width / this.numRows;
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].setDimensions(this.laneHeight, this.width, graphics.width);
        }
        if (this.frog) {
            this.frog.setDimensions(this.laneHeight, this.width, graphics.width);
        }
        if (this.topRow) {
            this.topRow.resize(this.laneHeight, this.width, graphics.width);
        }
        if (this.gameStatus) {
            this.gameStatus.setDimensions(this.laneHeight);
        }
        this.width = graphics.width;
        this.height = graphics.height;
    }
}