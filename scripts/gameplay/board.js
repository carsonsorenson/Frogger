class Board {
    constructor(width, height, numLanes) {
        this.width = width;
        this.height = height;
        this.numLanes = numLanes;

        this.semiTime = 5000;
        this.semiMoveRate = this.width / (10 * 1000);
        this.semiOneElapsed = Math.floor(Math.random() * this.semiTime);
        this.semiTwoElapsed = Math.floor(Math.random() * this.semiTime);

        this.fireTruckTime = 4000;
        this.fireTruckMoveRate = this.width / (8 * 1000);
        this.fireTruckElapsed = Math.floor(Math.random() * this.fireTruckTime);

        this.carTime = 3000;
        this.carMoveRate = this.width / (6 * 1000);
        this.carOneElapsed = Math.floor(Math.random() * this.carTime);
        this.carTwoElapsed = Math.floor(Math.random() * this.carTime);

        this.objects = [];
    }

    update(elapsedTime) {
        this.semiOneElapsed += elapsedTime;
        this.semiTwoElapsed += elapsedTime;
        this.fireTruckElapsed += elapsedTime;
        this.carOneElapsed += elapsedTime;
        this.carTwoElapsed += elapsedTime;

        if (this.semiOneElapsed > this.semiTime) {
            this.semiOneElapsed = 0;
            this.objects.push(
                new Car(MyGame.graphics, MyGame.objects.sprites, 8, this.semiMoveRate, this.numLanes, this.width, this.height)
            );
        }
        if (this.semiTwoElapsed > this.semiTime) {
            this.semiTwoElapsed = 0;
            this.objects.push(
                new Car(MyGame.graphics, MyGame.objects.sprites, 11, this.semiMoveRate, this.numLanes, this.width, this.height)
            );
        }
        if (this.fireTruckElapsed > this.fireTruckTime) {
            this.fireTruckElapsed = 0;
            this.objects.push(
                new Car(MyGame.graphics, MyGame.objects.sprites, 9, this.fireTruckMoveRate, this.numLanes, this.width, this.height)
            );
        }
        if (this.carOneElapsed > this.carTime) {
            this.carOneElapsed = 0;
            this.objects.push(
                new Car(MyGame.graphics, MyGame.objects.sprites, 10, this.carMoveRate, this.numLanes, this.width, this.height)
            );
        }
        if (this.carTwoElapsed > this.carTime) {
            this.carTwoElapsed = 0;
            this.objects.push(
                new Car(MyGame.graphics, MyGame.objects.sprites, 12, this.carMoveRate, this.numLanes, this.width, this.height)
            );
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

    render() {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].render();
        }
    }

}