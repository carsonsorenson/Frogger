MyGame.render.topRow = (function(graphics) {
    function render(spec) {
        graphics.drawSprite(
            spec.image,
            spec.center,
            spec.size,
            0
        )
    }

    return {
        render
    }
}(MyGame.graphics));