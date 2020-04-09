MyGame.render.frogLives = (function(graphics) {
    function render(sprite, numLives, center, size) {
        for (let i = 0; i < numLives; i++) {
            graphics.drawSprite(
                sprite,
                {
                    x: center.x + (size.width * i * 0.7),
                    y: center.y
                },
                size
            )
        }
    }

    return {
        render
    }
}(MyGame.graphics));