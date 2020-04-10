MyGame.render.score = (function(graphics) {
    let fillStyle = "black";
    let textColor = "white";

    function render(topRow, score, highScore) {
        let fontSize = topRow.laneHeight / 2.5;
        let font = `${fontSize}px monospace`;

        let scoreText = `Score ${score}`;
        let scoreWidth = graphics.textWidth(font, scoreText);
        let scoreSize = {
            width: topRow.laneWidth * 2,
            height: topRow.laneHeight * 0.9,
        }
        let scoreCenter = {
            x: (topRow.objects[5].center.x  + topRow.objects[6].center.x) / 2,
            y: (topRow.laneHeight / 2)
        };

        graphics.drawRect({
            fillStyle,
            center: scoreCenter,
            size: scoreSize
        });

        graphics.drawText({
            font,
            fillStyle: textColor,
            text: scoreText,
            pos: {
                x: scoreCenter.x - (scoreWidth / 2),
                y: scoreCenter.y
            }
        });

        let highScoreText = `High ${highScore}`;
        let highScoreWidth = graphics.textWidth(font, highScoreText);
        let highScoreCenter = {
            x: (topRow.objects[8].center.x  + topRow.objects[9].center.x) / 2,
            y: (topRow.laneHeight / 2)
        };

        graphics.drawRect({
            fillStyle,
            center: highScoreCenter,
            size: scoreSize
        });

        graphics.drawText({
            font,
            fillStyle: textColor,
            text: highScoreText,
            pos: {
                x: highScoreCenter.x - (highScoreWidth / 2),
                y: highScoreCenter.y
            }
        });
    }

    return {
        render
    }
}(MyGame.graphics));