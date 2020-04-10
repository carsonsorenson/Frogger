MyGame.render.pause = (function(graphics, game) {
    let pause = document.getElementById("pauseGame");
    let madeBlock = false;
    let stayPaused = true;
    let exit = false;

    function render() {
        graphics.drawDarkBackground();
        if (!madeBlock) {
            madeBlock = true;
            pause.style.display = "block";
        }
    }

    function initialize() {
        madeBlock = false;
        exit = false;
        stayPaused = true;
    }

    document.getElementById("pauseMainMenu").addEventListener(
        'click', function() {
            pause.style.display = "none";
            exit = true;
            game.showScreen("mainMenu");
        }
    )

    document.getElementById("pauseReturn").addEventListener(
        'click', function() {
            pause.style.display = "none";
            stayPaused = false;
        }
    )

    return {
        get stayPaused() {return stayPaused},
        get exit() {return exit},
        render,
        initialize
    }
}(MyGame.graphics, MyGame.game));