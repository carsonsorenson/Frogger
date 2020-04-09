MyGame.game = (function(screens) {
    function showScreen(id) {
        let active = document.getElementsByClassName('active');
        for (let i = 0; i < active.length; i++) {
            active[i].classList.remove('active');
        }

        if (id == "gameplay") {
            menuing.style.border = "0px";
        }
        else {
            menuing.style.border = "2px solid white";
        }

        screens[id].run();
        document.getElementById(id).classList.add('active');
    }

    function resize() {
        let w = window.innerWidth;
        let h = window.innerHeight;
        h > w ? s = w : s = h;
        width = s * 0.8;
        let height = s * 0.95;
        document.getElementById('menuing').style.width = `${width}px`;
        document.getElementById('menuing').style.height = `${height}px`;
        document.getElementById('menuing').style["font-size"] = `${width / 27}px`;
    }

    function initialize() {
        window.addEventListener('resize', resize);
        resize();

        let screen = null;
        for (screen in screens) {
            screens[screen].initialize(showScreen);
        }
        showScreen('gameplay')
    }

    return {
        initialize,
        showScreen
    }

}(MyGame.screens));