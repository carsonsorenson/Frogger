MyGame.persistence = (function() {
    let keyBindings = {};
    let previousKeyBindings = localStorage.getItem("Frogger.keybindings");

    if (previousKeyBindings !== null) {
        keyBindings = JSON.parse(previousKeyBindings);
    }

    function addKeyBinding(key, value) {
        keyBindings[key] = value;
        localStorage['Frogger.keybindings'] = JSON.stringify(keyBindings);
    }

    function removeKeyBinding(key) {
        delete keyBindings[key];
        localStorage['Frogger.keybindings'] = JSON.stringify(keyBindings);
    }

    return {
        get keyBindings() {return keyBindings},
        addKeyBinding,
        removeKeyBinding,
    }
}());