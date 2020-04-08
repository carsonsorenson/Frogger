MyGame.screens['gameplay'] = (function(game, graphics) {
    let lastTime
    let rows;
    let cols;
    let board;

    function processInput(elapsedTime) {

    }

    function update(elapsedTime) {
        board.update(elapsedTime);
    }

    function render() {
        graphics.clear();
        graphics.drawBackground();
        //graphics.drawLines(rows);
        board.render();
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTime;
        lastTime = time;

        let fps = 1000 / elapsedTime;
        if (fps < 50) {
            console.log('here!!');
        }

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        requestAnimationFrame(gameLoop);

    }

    function run() {
        board = new Board(rows, cols);
        lastTime = performance.now();
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

}(MyGame.game, MyGame.graphics));