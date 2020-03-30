MyGame.screens['gameplay'] = (function(game, graphics) {
    let lastTime;

    function processInput(elapsedTime) {

    }

    function update(elapsedTime) {

    }

    function render() {
        graphics.clear();
        graphics.drawBackground();
        graphics.drawLines();
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTime;
        lastTime = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        requestAnimationFrame(gameLoop);

    }

    function run() {
        lastTime = performance.now();
        requestAnimationFrame(gameLoop);
    }

    function initialize() {
        graphics.initalize();
    }

    return {
        initialize,
        run
    }

}(MyGame.game, MyGame.graphics));