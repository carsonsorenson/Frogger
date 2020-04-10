MyGame.screens['controls'] = (function(persistence) {;
    if (!('left' in persistence.keyBindings)) {
        persistence.addKeyBinding('left', 'a');
        persistence.addKeyBinding('right', 'd');
        persistence.addKeyBinding('up', 'w');
        persistence.addKeyBinding('down', 's');
        persistence.addKeyBinding('pause', 'Escape');
    }

    let buttons = {
        left: {
            row: document.getElementById("leftRow"),
            key: document.getElementById("leftItem"),
            active: false,
        },
        right: {
            row: document.getElementById("rightRow"),
            key: document.getElementById("rightItem"),
            active: false
        },
        up: {
            row: document.getElementById("upRow"),
            key: document.getElementById("upItem"),
            active: false
        },
        down: {
            row: document.getElementById("downRow"),
            key: document.getElementById("downItem"),
            active: false
        },
        pause: {
            row: document.getElementById("pauseRow"),
            key: document.getElementById("pauseItem"),
            active: false
        },
    };

    function removeActives() {
        for (let button in buttons) {
            buttons[button].row.classList.remove('active');
            buttons[button].key.classList.remove('blinking');
            buttons[button].key.innerHTML = persistence.keyBindings[button];
            buttons[button].active = false;
        }
    }

    function changeBinding(element, curButton) {
        element.classList.add('active');
        buttons[curButton].active = true;
        buttons[curButton].key.innerHTML = "Enter New Key";
        buttons[curButton].key.classList.add('blinking');
    }

    function onKeyPress(e) {
        for (let button in buttons) {
            if (buttons[button].active) {
                persistence.addKeyBinding(button, e.key);
                buttons[button].key.innerHTML = e.key;
                buttons[button].key.classList.remove('blinking');
            }
        }
    }

    function initialize(showScreen) {
        document.addEventListener("keydown", onKeyPress);
        document.getElementById("controlsBack").addEventListener(
            'click', function() {
                removeActives();
                showScreen('mainMenu');
            }
        )

        for (let button in buttons) {
            buttons[button].row.classList.remove('active');
            buttons[button].row.addEventListener(
                'click', function() {
                    removeActives();
                    changeBinding(this, button);
                }
            )
            buttons[button].key.innerHTML = persistence.keyBindings[button];
        }
    }

    function run() {};

    return {
        initialize,
        run
    }
}(MyGame.persistence));