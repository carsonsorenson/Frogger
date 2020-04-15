class Particle {
    constructor(spec) {
        this.spec = spec;
        this.spec.alive = 0;
    }

    update(elapsedTime) {
        this.spec.center.x += this.spec.direction.x * elapsedTime * this.spec.speed;
        this.spec.center.y += this.spec.direction.y * elapsedTime * this.spec.speed;
        this.spec.alive += elapsedTime;
    }

    isAlive() {
        return this.spec.alive < this.spec.lifetime;
    }
}