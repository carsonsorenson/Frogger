MyGame.screens['highScores'] = (function() {
    function initialize(showScreen) {
        document.getElementById("highScoresBack").addEventListener(
            'click', function() {
                showScreen('mainMenu');
            }
        )
    }

    function run() {}

    return {
        initialize,
        run
    }
}());