MyGame.screens['gameplay'] = (function(game, graphics, input) {
    let lastTime
    let rows;
    let cols;
    let board;
    let myInput;
    let totalTime;

    function processInput(elapsedTime) {
        board.processInput(myInput.inputBuffer, elapsedTime);
    }

    function update(elapsedTime) {
        myInput.update(elapsedTime);
        board.update(elapsedTime);
    }

    function render() {
        graphics.clear();
        graphics.drawBackground();
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

        if (board.frog.alive) {
            requestAnimationFrame(gameLoop);
        }
    }

    function run() {
        totalTime = 0;
        board = new Board(rows, cols);
        lastTime = performance.now();
        myInput = input.Keyboard();
        requestAnimationFrame(gameLoop);
    }

    function initialize() {
        rows = 15;
        cols = 15;
        graphics.initalize();
    }

    return {
        initialize,
        run
    }

}(MyGame.game, MyGame.graphics, MyGame.input));