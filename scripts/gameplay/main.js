MyGame.screens['gameplay'] = (function(game, graphics, objects, persistence, input) {
    let lastTime;
    let rows;
    let board;
    let myInput;
    let paused;

    function processInput(elapsedTime) {
        for (let key in myInput.inputBuffer) {
            if (key === persistence.keyBindings.pause) {
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
        graphics.drawBackground();
        board.render();
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTime;
        lastTime = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (board.frog.alive) {
            requestAnimationFrame(gameLoop);
        }
    }

    function run() {
        myInput = input.Keyboard();
        paused = false;
        lastTime = performance.now();
        board = new Board(rows, graphics, objects, persistence.keyBindings);
        requestAnimationFrame(gameLoop);
    }

    function initialize() {
        rows = 15;
        graphics.initialize();
    }

    return {
        initialize,
        run
    }
}(MyGame.game, MyGame.graphics, MyGame.objects, MyGame.persistence, MyGame.input));