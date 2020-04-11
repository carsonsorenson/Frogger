class Attract {
    constructor(board) {
        this.board = board;

        this.trafficGrid = [];
        for (let i = 8; i < this.board.numRows - 1; i++) {
            let row = [];
            for (let j = 0; j < this.board.numRows * 4; j++) {
                if (j == 0 || j == this.board.numRows - 1) {
                    row.push(0);
                }
                else {
                    row.push(1);
                }
            }
            this.trafficGrid.push(row);
        }
        this.stayFor = 150;
        this.elapsed = -1000;

        this.updateTrafficGrid();
    }

    updateTrafficGrid() {
        for (let i = 0; i < this.trafficGrid.length; i++) {
            for (let j = 0; j < this.trafficGrid[i].length; j++) {
                if (j == 0 || j >= this.trafficGrid[i].length - 1) {
                    this.trafficGrid[i][j] = 0;
                }
                else {
                    this.trafficGrid[i][j] = 1;
                }
            }
        }

        for (let i = 0; i < this.board.objects.length; i++) {
            let row = this.board.objects[i].lane;
            if (row > 7) {
                let cx = this.board.objects[i].center.x;
                let w = this.board.objects[i].size.width;

                let left = cx - (w / 2);
                let right = cx + (w/ 2);


                let leftCol = Math.floor(left / this.board.laneWidth);
                if (left / this.board.laneWidth - leftCol < 0.8) {
                    leftCol--;
                }
                let rightCol = Math.floor(right / this.board.laneWidth);
                if (right / this.board.laneWidth - rightCol > 0.2) {
                    rightCol++;
                }

                for (let j = leftCol; j <= rightCol; j++) {
                    if (j >= 0 && j < 15) {
                        this.trafficGrid[row - 8][j] = 0;
                    }
                }
            }
        }
    }

    update(elapsedTime) {
        this.updateTrafficGrid();
        let r = this.board.frog.lane - 8;
        let c = Math.floor(this.board.frog.center.x / this.board.laneWidth)

        if (!this.board.frog.moving) {
            this.elapsed += elapsedTime;
        }

        if (this.elapsed > this.stayFor) {
            this.elapsed = 0;
            if (r > 0) {
                if (this.trafficGrid[r-1][c] === 1) {
                    this.board.frog.moveUp(elapsedTime)
                }
                else if (r == 4 || r == 2) {
                    if (this.trafficGrid[r][c-1] === 1) {
                        this.board.frog.moveLeft(elapsedTime);
                    }
                    else if (this.trafficGrid[r][c+1] === 1) {
                        this.board.frog.moveRight(elapsedTime);
                    }
                    else if (this.trafficGrid[r+1][c] === 1){
                        this.board.frog.moveDown(elapsedTime);
                    }
                    else {
                        this.board.frog.moveLeft(elapsedTime);
                    }
                }
                else {
                    if (this.trafficGrid[r][c+1] === 1) {
                        this.board.frog.moveRight(elapsedTime);
                    }
                    else if (this.trafficGrid[r][c-1] === 1) {
                        this.board.frog.moveLeft(elapsedTime);
                    }
                    else if (this.trafficGrid[r+1][c] === 1){
                        this.board.frog.moveDown(elapsedTime);
                    }
                    else {
                        this.board.frog.moveRight(elapsedTime);
                    }
                }
            }
            else if (r > -2) {
                this.board.frog.moveUp();
            }
        }
    }

    render() {
        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = "rgba(255, 0, 0, 0.3)";

        for (let i = 0; i < this.trafficGrid.length; i++) {
            for (let j = 0; j < this.trafficGrid[i].length; j++) {
                if (this.trafficGrid[i][j] === 0) {
                    ctx.fillRect(
                        j * this.board.laneWidth,
                        (i + 8) * this.board.laneHeight,
                        this.board.laneWidth,
                        this.board.laneHeight
                    );
                }
            }
        }
    }
    
}