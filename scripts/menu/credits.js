MyGame.screens['credits'] = (function() {
    function initialize(showScreen) {
        document.getElementById("creditsBack").addEventListener(
            'click', function() {
                showScreen('mainMenu');
            }
        )
    }

    function run() {};

    return {
        initialize,
        run
    }
}());