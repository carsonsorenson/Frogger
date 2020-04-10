MyGame.render.gameOver = (function(graphics, game, persistence) {
    let gameOver = document.getElementById("gameOver");
    let scoreName = document.getElementById("scoreName");
    let leaderboard = document.getElementById("leaderboard");
    let noLeaderBoard = document.getElementById("noLeaderboard");

    function render(score) {
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
    }

    document.getElementById("submitScore").addEventListener(
        'click', function() {
            //persistence.addScore(scoreName.value, score);
            gameOver.style.display = "none";
            exit = true;
            game.showScreen('highScores');
        }
    )

    return {
        render
    }
}(MyGame.graphics, MyGame.game, MyGame.persistence));