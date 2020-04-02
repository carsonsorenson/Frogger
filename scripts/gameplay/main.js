MyGame.screens['gameplay'] = (function(game, graphics) {
    let lastTime;
    let rows;
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

        console.log(1000 / elapsedTime);

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        requestAnimationFrame(gameLoop);

    }

    function run() {
        board = new Board(rows);
        lastTime = performance.now();
        requestAnimationFrame(gameLoop);
    }

    function initialize() {
        rows = 15;
        graphics.initalize();
    }

    return {
        initialize,
        run
    }

}(MyGame.game, MyGame.graphics));