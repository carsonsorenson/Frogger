class Board {
    constructor(numLanes) {
        this.objects = [];
        this.width = MyGame.graphics.width;
        this.height = MyGame.graphics.height;
        this.numLanes = numLanes;
        this.laneHeight = this.height / this.numLanes; 

        this.lanes = []
        this.lanes.push(this.generateObject(8, 5000, 10 * 1000, MyGame.objects.sprites.getSemi, Math.PI));
        this.lanes.push(this.generateObject(9, 4000, 8 * 1000, MyGame.objects.sprites.getFireTruck, 0));
        this.lanes.push(this.generateObject(10, 3000, 6 * 1000, MyGame.objects.sprites.getRandomCar, Math.PI));
        this.lanes.push(this.generateObject(11, 5000, 10 * 1000, MyGame.objects.sprites.getSemi, 0));
        this.lanes.push(this.generateObject(12, 3000, 6 * 1000, MyGame.objects.sprites.getRandomCar, Math.PI));

        window.addEventListener('resize', () => this.resize(MyGame.graphics.width, MyGame.graphics.height));
    }

    getY(laneNumber) {
        return laneNumber * (this.height / this.numLanes) + (this.laneHeight / 2);
    }

    generateObject(laneNumber, respawnRate, moveRate, obj, rotation) {
        let elapsedTime = Math.floor(Math.random() * respawnRate);
        let center = {x: 0, y: this.getY(laneNumber)};
        if (rotation != 0) {
            center.x = this.width;
        }

        return {
            laneNumber,
            respawnRate,
            moveRate,
            obj,
            rotation,
            elapsedTime,
            center
        }
    }

    update(elapsedTime) {
        for (let i = 0; i < this.lanes.length; i++) {
            this.lanes[i].elapsedTime += elapsedTime;
            if (this.lanes[i].elapsedTime > this.lanes[i].respawnRate) {
                this.lanes[i].elapsedTime = 0;
                let newCar = new Car(this.lanes[i], this.laneHeight, this.width);
                this.objects.push(newCar);
            }
        }

        for (let i = this.objects.length - 1; i >= 0; i--) {
            let x = this.objects[i].center.x;
            let w = this.objects[i].size.width;
            if (x < 0 - (w / 2) || x > this.width + (w / 2)) {
                this.objects.splice(i, 1);
            }
            else {
                this.objects[i].update(elapsedTime);
            }
        }
    }

    resize(width, height) {
        this.height = height;
        this.laneHeight = this.height / this.numLanes; 
        for (let i = 0; i < this.objects.length; i++) {
            let y = this.getY(this.objects[i].laneNumber);
            let x = width * (this.objects[i].center.x / this.width);
            this.objects[i].center.y = y;
            this.objects[i].center.x = x;
            this.objects[i].resize(width, this.laneHeight);
        }
        this.width = width;

        for (let i = 0; i < this.lanes.length; i++) {
            let y = this.getY(this.lanes[i].laneNumber);
            this.lanes[i].center.y = y;
            this.lanes[i].center.x = 0;
            if (this.lanes[i].rotation != 0) {
                this.lanes[i].center.x = this.width;
            }
        }
    }

    render() {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].render(MyGame.graphics.drawSprite);
        }
    }
}