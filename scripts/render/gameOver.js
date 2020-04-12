MyGame.render.gameOver = (function(graphics, game, persistence, menuSound) {
    let gameOver = document.getElementById("gameOver");
    let scoreName = document.getElementById("scoreName");
    let leaderboard = document.getElementById("leaderboard");
    let noLeaderBoard = document.getElementById("noLeaderboard");
    let gameOverMessage = document.getElementById("gameOverMessage");
    let myScore = null;

    function render(score, message) {
        myScore = score;
        graphics.drawDarkBackground();
        scoreName.value = "";
        gameOver.style.display = "block";
        if (persistence.canAddScore(score)) {
            leaderboard.style.display = "block";
            noLeaderBoard.style.display = "none";
        }
        else {
            leaderboard.style.display = "none";
            noLeaderBoard.style.display = "block";
        }
        gameOverMessage.innerHTML = message;
    }

    document.getElementById("submitScore").addEventListener(
        'click', function() {
            persistence.addScore(scoreName.value, myScore);
            gameOver.style.display = "none";
            game.showScreen('highScores');
            menuSound.currentTime = 0;
            menuSound.pause();
        }
    )

    document.getElementById("noLeaderboardButton").addEventListener(
        'click', function() {
            persistence.addScore(scoreName.value, myScore);
            gameOver.style.display = "none";
            game.showScreen('mainMenu');
            menuSound.currentTime = 0;
            menuSound.pause();
        }
    )

    return {
        render
    }
}(MyGame.graphics, MyGame.game, MyGame.persistence, MyGame.assets.menuSound));