MyGame.game = (function(screens) {
    function showScreen(id) {
        let active = document.getElementsByClassName('active');
        for (let i = 0; i < active.length; i++) {
            active[i].classList.remove('active');
        }
        screens[id].run();
        document.getElementById(id).classList.add('active');
    }

    function initialize() {
        for (screen in screens) {
            screens[screen].initialize();
        }
        showScreen('gameplay')
    }

    return {
        initialize,
        showScreen
    }

}(MyGame.screens));