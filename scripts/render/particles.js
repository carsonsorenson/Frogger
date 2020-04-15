MyGame.render.particles = (function(graphics) {
    function render(particleSystem) {
        for (let i = 0; i < particleSystem.particles.length; i++) {
            let spec = particleSystem.particles[i].spec;
            if (spec.image) {
                graphics.drawImage(spec);
            }
            else {
                graphics.drawRect({
                    fillStyle: 'gold',
                    center: spec.center,
                    size: spec.size,
                    rotation: spec.rotation
                });
            }
        }
    }

    return {
        render
    }
}(MyGame.graphics));