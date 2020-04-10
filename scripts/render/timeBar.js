MyGame.render.timeBar = (function(graphics) {
    let color = "black";
    let rectColor = "green";

    function render(time, totalTime, laneHeight) {
        let prettyTime = Math.ceil(time / 1000);
        if (prettyTime < 10) {
            prettyTime = `0${prettyTime}`;
        }
        let text = `Time ${prettyTime}`;

        let fontSize = Math.floor(laneHeight / 2);
        let font = `${fontSize}px monospace`;

        let width = graphics.textWidth(font, text);

        graphics.drawText({
            font,
            fillStyle: color,
            text,
            pos: {
                x: graphics.width - width,
                y: graphics.height - laneHeight
            }
        });

        if (time > 0) {
            let rectWidth = (graphics.width / (3 * totalTime)) * time;
            graphics.drawRect({
                fillStyle: rectColor,
                pos: {
                    x: (graphics.width - width) - rectWidth,
                    y: graphics.height - laneHeight
                },
                size: {
                    width: rectWidth,
                    height: laneHeight / 1.5,
                }
            });
        }   
    }

    return {
        render
    }
}(MyGame.graphics));