MyGame.render.death = (function(graphics) {
    function render(sprite, center, size) {
        graphics.drawSprite(
            sprite,
            center,
            {width: size, height: size}
        )
    }

    return {
        render
    }
}(MyGame.graphics));