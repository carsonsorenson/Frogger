class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    home(center, size) {
        let directions = [
            {x: center.x - (size.width / 2), y: center.y},
            {x: center.x + (size.width / 2), y: center.y},
            {x: center.x, y: center.y - (size.width / 2)},
            {x: center.x, y: center.y + (size.width / 2)}
        ];

        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < directions.length; j++) {
                this.particles.push(new Particle({
                    center: {...directions[j]},
                    size: {width: 3, height: 3},
                    rotation: 0,
                    lifetime: Random.nextGaussian(1000, 100),
                    speed: Random.nextGaussian(0, 0.03),
                    direction: Random.nextCircleVector(),
                }));
            }
        }
    }

    update(elapsedTime) {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].spec.direction = Random.nextCircleVector();
            this.particles[i].update(elapsedTime);
            if (!this.particles[i].isAlive()) {
                this.particles.splice(i, 1);
            }
        }
    }
}