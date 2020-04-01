MyGame.objects.sprites = (function(assets) {
    let spriteRows = 7;
    let spriteHeight = assets.sprites.height / spriteRows;

    let cars = [
        {image: assets.sprites, x: 10, y: 6 * spriteHeight, width: 130, height: spriteHeight},
        {image: assets.sprites, x: 155, y: 6 * spriteHeight, width: 135, height: spriteHeight},
        {image: assets.sprites, x: 305, y: 6 * spriteHeight, width: 135, height: spriteHeight}
    ];

    function getLogs() {
        return [
            {image: assets.sprites, x: 10, y: 3 * spriteHeight, width: 360, height: spriteHeight},
            {image: assets.sprites, x: 385, y: 3 * spriteHeight, width: 190, height: spriteHeight},
            {image: assets.sprites, x: 10, y: 4 * spriteHeight, width: 280, height: spriteHeight}
        ];
    }

    function getTurtles() {
        return [
            {image: assets.sprites, x: 400, y: 0, width: 74, height: spriteHeight},
            {image: assets.sprites, x: 474, y: 0, width: 74, height: spriteHeight},
            {image: assets.sprites, x: 5, y: spriteHeight, width: 74, height: spriteHeight},
            {image: assets.sprites, x: 79, y: spriteHeight, width: 74, height: spriteHeight},
            {image: assets.sprites, x: 153, y: spriteHeight, width: 74, height: spriteHeight},
            {image: assets.sprites, x: 227, y: spriteHeight, width: 74, height: spriteHeight},
            {image: assets.sprites, x: 301, y: spriteHeight, width: 74, height: spriteHeight}
        ];
    }

    function getTurtlesDiving() {
        return [
            {image: assets.sprites, x: 374, y: spriteHeight, width: 74, height: spriteHeight},
            {image: assets.sprites, x: 448, y: spriteHeight, width: 65, height: spriteHeight},
            {image: assets.sprites, x: 513, y: spriteHeight, width: 45, height: spriteHeight},
            {image: assets.sprites, x: 560, y: spriteHeight, width: 40, height: spriteHeight}
        ];
    }

    function getRandomCar() {
        let index = [Math.floor(Math.random() * cars.length)];
        return cars[index];
    }

    function getSemi() {
        return {image: assets.sprites, x: 202, y: 5 * spriteHeight, width: 285, height: spriteHeight};
    }

    function getFireTruck() {
        return {image: assets.sprites, x: 5, y: 5 * spriteHeight, width: 182, height: spriteHeight};
    }

    function getLillyPad() {
        return {image: assets.sprites, x: 5, y: 2 * spriteHeight, width: 65, height: spriteHeight};
    }

    function getFly() {
        return {image: assets.sprites, x: 80, y: 2 * spriteHeight, width: 50, height: spriteHeight};
    }

    function getDeath() {
        return {image: assets.sprites, x: 300, y: 4 * spriteHeight, width: 70, height: spriteHeight}
    }

    function getBush() {
        return {image: assets.sprites, x: 408, y: 2 * spriteHeight, width: spriteHeight, height: spriteHeight};
    }

    function getBushWithLillyPad() {
        return {image: assets.sprites, x: 498, y: 2 * spriteHeight, width: spriteHeight, height: spriteHeight};
    }

    return {
        getLogs,
        getTurtles,
        getTurtlesDiving,
        getRandomCar,
        getFireTruck,
        getSemi,
        getLillyPad,
        getFly,
        getDeath,
        getBush,
        getBushWithLillyPad
    }

}(MyGame.assets))