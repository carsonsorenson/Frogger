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
        this.frog = new Frog(MyGame.graphics.sprites.getFrogs(), this.laneWidth, this.laneHeight, 13);
        this.lanes = [
            {laneNumber: 1, constructor: Log, moveRate: 10000, respawnRate: 2750, obj: this.sprites.getMediumLog, rotation: 0, start: 'left'},
            {laneNumber: 2, constructor: Turtle, moveRate: 10000, respawnRate: 4000, obj: this.sprites.getTurtles, rotation: Math.PI, start: 'right'},
            {laneNumber: 3, constructor: Log, moveRate: 8000, respawnRate: 3000, obj: this.sprites.getLongLog, rotation: 0, start: 'left'},
            {laneNumber: 4, constructor: Log, moveRate: 14000, respawnRate: 2500, obj: this.sprites.getShortLog, rotation: 0, start: 'left'},
            {laneNumber: 5, constructor: Turtle, moveRate: 10000, respawnRate: 4000, obj: this.sprites.getTurtles, rotation: Math.PI, start: 'right'},
            {laneNumber: 8, constructor: Car, moveRate: 10000, respawnRate: 5000, obj: this.sprites.getSemi, rotation: Math.PI, start: 'right'},
            {laneNumber: 9, constructor: Car, moveRate: 8000, respawnRate: 4000, obj: this.sprites.getFireTruck, rotation: 0, start: 'left'},
            {laneNumber: 10, constructor: Car, moveRate: 6000, respawnRate: 3000, obj: this.sprites.getRandomCar, rotation: Math.PI, start: 'right'},
            {laneNumber: 11, constructor: Car, moveRate: 10000, respawnRate: 5000, obj: this.sprites.getSemi, rotation: 0, start: 'left'},
            {laneNumber: 12, constructor: Car, moveRate: 6000, respawnRate: 3000, obj: this.sprites.getRandomCar, rotation: Math.PI, start: 'right'},
        ];

        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].elapsedTime = Math.floor(Math.random() * this.lanes[i].respawnRate);
            this.lanes[i].center = {x: null, y: null};
            this.lanes[i].center.y = this.getY(this.lanes[i].laneNumber, this.height);
            this.lanes[i].start == 'left' ? this.lanes[i].center.x = 0 : this.lanes[i].center.x = this.width;
        }
    }

    getY(laneNumber, height) {
        return laneNumber * (height / this.numRows) + (this.laneHeight / 2);
    }

    update(elapsedTime) {
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
    }

    render() {
        this.topRow.render(MyGame.graphics.drawSprite);
        this.frog.render(MyGame.graphics.drawSprite);
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].render(MyGame.graphics.drawSprite);
        }
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