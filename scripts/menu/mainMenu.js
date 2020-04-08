MyGame.screens['mainMenu'] = (function() {
    function initialize(showScreen) {
        document.getElementById("mainNewGame").addEventListener(
            'click', function() {
                showScreen('gameplay');
            }
        )

        document.getElementById("mainControls").addEventListener(
            'click', function() {
                showScreen('controls')
            }
        )
        
        document.getElementById("mainHighScores").addEventListener(
            'click', function() {
                showScreen('highScores')
            }
        )

        document.getElementById("mainCredits").addEventListener(
            'click', function() {
                showScreen('credits')
            }
        )
    }

    function run() {}

    return {
        initialize,
        run
    }
}());