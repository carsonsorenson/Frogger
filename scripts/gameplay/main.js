MyGame.screens['gameplay'] = (function(game, graphics, objects, persistence, input, renderer) {
    let lastTime;
    let rows;
    let board;
    let myInput;
    let paused;
    let gameOver;
    let cancelNextFrame;

    function processInput(elapsedTime) {
        if (!gameOver && !paused) {
            for (let key in myInput.inputBuffer) {
                if (key === persistence.keyBindings.pause) {
                    paused = true;
                    renderer.pause.initialize();
                    myInput.update(elapsedTime);
                }
                else {
                    board.processInput(key, elapsedTime);
                }
            }
        }
    }

    function update(elapsedTime) {
        myInput.update(elapsedTime);
        if (!gameOver && !paused) {
            board.update(elapsedTime);
            gameOver = board.gameOver();
        }
    }

    function render() {
        graphics.drawBackground();
        board.render();
        if (paused) {
            renderer.pause.render();
            paused = renderer.pause.stayPaused;
            cancelNextFrame = renderer.pause.exit;
        }
        if (gameOver) {
            renderer.gameOver.render(board.gameStatus.score);
            cancelNextFrame = true;
        }
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTime;
        lastTime = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextFrame) {
            requestAnimationFrame(gameLoop);
        }
    }

    function run() {
        myInput = input.Keyboard();
        paused = false;
        gameOver = false;
        cancelNextFrame = false;
        lastTime = performance.now();
        board = new Board(rows, graphics, objects, renderer, persistence);
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
}(MyGame.game, MyGame.graphics, MyGame.objects, MyGame.persistence, MyGame.input, MyGame.render));