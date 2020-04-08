MyGame.screens['gameplay'] = (function() {
    let lastTime
    let rows;
    let cols;
    let board;
    let myInput;
    let totalTime;
    let paused;

    function processInput(elapsedTime) {
        for (let key in myInput.inputBuffer) {
            if (key === MyGame.persistence.keyBindings.pause) {
                paused = !paused;
            }
            else {
                board.processInput(key, elapsedTime);
            }
        }
    }

    function update(elapsedTime) {
        myInput.update(elapsedTime);
        board.update(elapsedTime);
    }

    function render() {
        MyGame.graphics.clear();
        MyGame.graphics.drawBackground();
        board.render();
        //graphics.drawLines(rows);
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTime;
        lastTime = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        totalTime += elapsedTime;
        let fps = 1000 / elapsedTime;
        if (fps < 50 && totalTime > 2000) {
            console.log(fps);
        }

        if (board.frog.alive && !paused) {
            requestAnimationFrame(gameLoop);
        }
    }

    function run() {
        paused = false;
        board = new Board(rows, cols, MyGame.persistence.keyBindings);
        lastTime = performance.now();
        myInput = MyGame.input.Keyboard();
        requestAnimationFrame(gameLoop);
    }

    function initialize() {
        rows = 15;
        cols = 15;
        MyGame.graphics.initalize();
    }

    return {
        initialize,
        run
    }

}());