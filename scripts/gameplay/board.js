class Board {
    constructor(numRows, numCols) {
        this.objects = [];
        this.width = MyGame.graphics.width;
        this.height = MyGame.graphics.height;
        this.numRows = numRows;
        this.numCols = numCols;
        this.laneHeight = this.height / this.numRows;
        this.laneWidth = this.width / this.numCols;

        window.addEventListener('resize', () => this.resize(MyGame.graphics.width, MyGame.graphics.height));

        this.sprites = MyGame.objects.sprites;

        this.topRow = new TopRow(this.sprites, this.laneHeight, this.laneWidth, this.numCols);
        this.frog = new Frog(this.sprites.getFrogs(), this.laneWidth, this.laneHeight, 13);
        this.lanes = [
            //{laneNumber: 1, constructor: Log, moveRate: 10000, respawnRate: 7500, obj: this.sprites.getMediumLog, rotation: 0, start: 'left'},
            {laneNumber: 2, constructor: Turtle, moveRate: 10000, respawnRate: 4000, obj: this.sprites.getTurtles, rotation: Math.PI, start: 'right'},
            //{laneNumber: 3, constructor: Log, moveRate: 10000, respawnRate: 5000, obj: this.sprites.getLongLog, rotation: 0, start: 'left'},
            //{laneNumber: 4, constructor: Log, moveRate: 14000, respawnRate: 6000, obj: this.sprites.getShortLog, rotation: 0, start: 'left'},
            {laneNumber: 5, constructor: Turtle, moveRate: 10000, respawnRate: 4000, obj: this.sprites.getTurtles, rotation: Math.PI, start: 'right'},
            //{laneNumber: 8, constructor: Car, moveRate: 10000, respawnRate: 5000, obj: this.sprites.getSemi, rotation: Math.PI, start: 'right'},
            //{laneNumber: 9, constructor: Car, moveRate: 8000, respawnRate: 4000, obj: this.sprites.getFireTruck, rotation: 0, start: 'left'},
            //{laneNumber: 10, constructor: Car, moveRate: 6000, respawnRate: 3000, obj: this.sprites.getRandomCar, rotation: Math.PI, start: 'right'},
            //{laneNumber: 11, constructor: Car, moveRate: 10000, respawnRate: 5000, obj: this.sprites.getSemi, rotation: 0, start: 'left'},
            //{laneNumber: 12, constructor: Car, moveRate: 6000, respawnRate: 3000, obj: this.sprites.getRandomCar, rotation: Math.PI, start: 'right'},
        ];

        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].elapsedTime = Math.floor(Math.random() * this.lanes[i].respawnRate);
            this.lanes[i].center = {x: null, y: null};
            this.lanes[i].center.y = this.getY(this.lanes[i].laneNumber, this.height);
            this.lanes[i].start == 'left' ? this.lanes[i].center.x = 0 : this.lanes[i].center.x = this.width;
        }

        this.bindings = {
            'a': (elapsedTime) => this.frog.moveLeft(elapsedTime),
            'w': (elapsedTime) => this.frog.moveUp(elapsedTime),
            'd': (elapsedTime) => this.frog.moveRight(elapsedTime),
            's': (elapsedTime) => this.frog.moveDown(elapsedTime)
        };
    }

    getY(laneNumber, height) {
        return laneNumber * (height / this.numRows) + (this.laneHeight / 2);
    }

    processInput(inputBuffer, elapsedTime) {
        for (let key in inputBuffer) {
            if (key in this.bindings) {
                this.bindings[key](elapsedTime);
            }
        }
    }

    intersects(elapsedTime) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].laneNumber == this.frog.laneNumber) {
                if (this.objects[i].type == 'car') {
                    let frogLeft = this.frog.center.x - (this.frog.size.width / 2);
                    let frogRight = this.frog.center.x + (this.frog.size.width / 2);
                    let left = this.objects[i].center.x - (this.objects[i].size.width / 2);
                    let right = this.objects[i].center.x + (this.objects[i].size.width / 2);
                    if (frogLeft < right && frogRight > left && this.frog.laneNumber) {
                        console.log('hit!');
                    }
                }
                else if (this.objects[i].type == 'log') {
                    let frogLeft = this.frog.center.x;
                    let frogRight = this.frog.center.x;
                    let left = this.objects[i].center.x - (this.objects[i].size.width / 2);
                    let right = this.objects[i].center.x + (this.objects[i].size.width / 2);
                    if (frogLeft < right && frogRight > left && this.frog.laneNumber) {
                        this.objects[i].updateFrog(elapsedTime, this.width, this.frog);
                    }
                }
                else if (this.objects[i].type == 'turtle') {
                    let frogLeft = this.frog.center.x;
                    let frogRight = this.frog.center.x;
                    for (let j = 0; j < this.objects[i].turtles.length; j++) {
                        let left = this.objects[i].turtles[j].center.x - (this.objects[i].size.width / 2);
                        let right = this.objects[i].turtles[j].center.x + (this.objects[i].size.width / 2);
                        if (frogLeft < right && frogRight > left && this.frog.laneNumber) {
                            console.log('hit!');
                            this.objects[i].updateFrog(elapsedTime, this.width, this.frog);
                        }
                    }
                }
            }
        }
    }

    update(elapsedTime) {
        this.frog.update(elapsedTime);
        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].elapsedTime += elapsedTime;;
            if (this.lanes[i].elapsedTime > this.lanes[i].respawnRate) {
                this.lanes[i].elapsedTime = 0;
                this.objects.push(new this.lanes[i].constructor(this.lanes[i], this.laneHeight));
            }
        }
        
        for (let i = this.objects.length - 1; i >= 0; i--) {
            let x = this.objects[i].getCenter().x;
            let w = this.objects[i].getSize().width;
            if (x < 0 - (w / 2) || x > this.width + (w / 2)) {
                this.objects[i] = null;
                this.objects.splice(i, 1);
            }
            else {
                this.objects[i].update(elapsedTime, this.width);
            }
        }
        this.intersects(elapsedTime);
    }

    render() {
        this.topRow.render(MyGame.graphics.drawSprite);
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].render(MyGame.graphics.drawSprite);
        }
        this.frog.render(MyGame.graphics.drawSprite);
    }

    resize(width, height) {
        this.laneHeight = height / this.numRows;
        this.laneWidth = width / this.numCols;
        this.topRow.resize(this.laneWidth, this.laneHeight);
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].setSize(this.laneHeight);
            let y = this.getY(this.objects[i].laneNumber, height);
            let x = width * (this.objects[i].getCenter().x / this.width);
            this.objects[i].setCenter(x, y);
        }

        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].center.y = this.getY(this.lanes[i].laneNumber, height);
            this.lanes[i].start == 'left' ? this.lanes[i].center.x = 0 : this.lanes[i].center.x = width;
        }

        this.width = width;
        this.height = height;
    }
}