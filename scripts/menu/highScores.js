MyGame.screens['highScores'] = (function(persistence) {
    function initialize(showScreen) {
        document.getElementById("highScoresBack").addEventListener(
            'click', function() {
                showScreen('mainMenu');
            }
        )
    }

    function run() {
        persistence.updateScores();
    }

    return {
        initialize,
        run
    }
}(MyGame.persistence));