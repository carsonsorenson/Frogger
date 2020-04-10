MyGame.persistence = (function() {
    let keyBindings = {};
    let previousKeyBindings = localStorage.getItem("Frogger.keybindings");

    let scores = [];
    let highScore = 0;
    let previousScores = localStorage.getItem("Frogger.scores");
    let amountToRemember = 5;

    if (previousKeyBindings !== null) {
        keyBindings = JSON.parse(previousKeyBindings);
    }

    if (previousScores !== null) {
        scores = JSON.parse(previousScores);
    }
    if (scores.length > 0) {
        highScore = scores[0].score;
    }

    function addKeyBinding(key, value) {
        keyBindings[key] = value;
        localStorage['Frogger.keybindings'] = JSON.stringify(keyBindings);
    }

    function removeKeyBinding(key) {
        delete keyBindings[key];
        localStorage['Frogger.keybindings'] = JSON.stringify(keyBindings);
    }

    function addScore(name, score) {
        scores.push({name, score});
        scores.sort((a, b) => (a.score < b.score) ? 1: -1);
        highScore = scores[0].score;
        localStorage['Frogger.scores'] = JSON.stringify(scores);
        if (scores.length > amountToRemember) {
            removeScore();
        }
    }

    function removeScore() {
        scores.splice(scores.length - 1, 1);
        localStorage['Frogger.scores'] = JSON.stringify(scores);
    }

    function canAddScore(score) {
        if (scores.length < amountToRemember) {
            return true;
        }
        else if (score > scores[scores.length - 1].score) {
            return true;
        }
        return false;
    }

    function updateScores() {
        let myNode = document.getElementById("highScoreList");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        for (let i = 0; i < amountToRemember; i++) {
            let node = document.createElement("li");
            let name = "";
            let score = "";
            if (i < scores.length) {
                name = scores[i].name + ': ';
                score = scores[i].score;
            }
            let s = `${i+1}: ${name}${score}`;
            let text = document.createTextNode(s);
            node.appendChild(text);
            document.getElementById("highScoreList").appendChild(node);
        }
    }

    return {
        get keyBindings() {return keyBindings},
        get highScore() {return highScore},
        addKeyBinding,
        removeKeyBinding,
        addScore,
        removeScore,
        canAddScore,
        updateScores
    }
}());