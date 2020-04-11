MyGame.objects.sprites = (function(assets) {
    let spriteRows = 7;
    let spriteHeight = assets.sprites.height / spriteRows;

    let alligatorRows = 2;
    let alligatorHeight = assets.alligatorSprites.height / alligatorRows;

    let cars = [
        {image: assets.sprites, x: 10, y: 6 * spriteHeight, width: 130, height: spriteHeight},
        {image: assets.sprites, x: 155, y: 6 * spriteHeight, width: 135, height: spriteHeight},
        {image: assets.sprites, x: 305, y: 6 * spriteHeight, width: 135, height: spriteHeight}
    ];

    function getShortLog() {
        return {image: assets.sprites, x: 385, y: 3 * spriteHeight + 15, width: 190, height: spriteHeight - 15};
    }

    function getMediumLog() {
        return {image: assets.sprites, x: 10, y: 4 * spriteHeight + 5, width: 280, height: spriteHeight - 15};
    }

    function getLongLog() {
        return {image: assets.sprites, x: 10, y: 3 * spriteHeight + 15, width: 360, height: spriteHeight - 15};
    }

    function getTurtles() {
        return [
            {image: assets.sprites, x: 400, y: 5, width: 74, height: spriteHeight - 15},
            {image: assets.sprites, x: 474, y: 5, width: 74, height: spriteHeight - 15},
            {image: assets.sprites, x: 5, y: spriteHeight + 5, width: 74, height: spriteHeight - 15},
            {image: assets.sprites, x: 79, y: spriteHeight + 5, width: 74, height: spriteHeight - 15},
            {image: assets.sprites, x: 153, y: spriteHeight + 5, width: 74, height: spriteHeight - 15},
            {image: assets.sprites, x: 227, y: spriteHeight + 5, width: 74, height: spriteHeight - 15},
            {image: assets.sprites, x: 301, y: spriteHeight + 5, width: 74, height: spriteHeight - 15},
            {image: assets.sprites, x: 400, y: 5, width: 74, height: spriteHeight - 15},
            {image: assets.sprites, x: 474, y: 5, width: 74, height: spriteHeight - 15},
            {image: assets.sprites, x: 5, y: spriteHeight + 5, width: 74, height: spriteHeight - 15},
            {image: assets.sprites, x: 79, y: spriteHeight + 5, width: 74, height: spriteHeight - 15},
            {image: assets.sprites, x: 153, y: spriteHeight + 5, width: 74, height: spriteHeight - 15},
            {image: assets.sprites, x: 227, y: spriteHeight + 5, width: 74, height: spriteHeight - 15},
            {image: assets.sprites, x: 301, y: spriteHeight + 5, width: 74, height: spriteHeight - 15}
        ];
    }

    function getTurtlesDiving() {
        return [
            {image: assets.sprites, x: 374, y: spriteHeight + 5, width: 74, height: spriteHeight - 15},
            {image: assets.sprites, x: 448, y: spriteHeight + 5, width: 65, height: spriteHeight - 15},
            {image: assets.sprites, x: 513, y: spriteHeight + 5, width: 45, height: spriteHeight - 15},
            {image: assets.sprites, x: 560, y: spriteHeight + 5, width: 40, height: spriteHeight - 15},
            {image: assets.sprites, x: 0, y: 0, width: 0, height: 0},
            {image: assets.sprites, x: 560, y: spriteHeight + 5, width: 40, height: spriteHeight - 15},
            {image: assets.sprites, x: 513, y: spriteHeight + 5, width: 45, height: spriteHeight - 15},
            {image: assets.sprites, x: 448, y: spriteHeight + 5, width: 65, height: spriteHeight - 15},
            {image: assets.sprites, x: 374, y: spriteHeight + 5, width: 74, height: spriteHeight - 15},
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

    function getAlligator() {
        return [
            {image: assets.alligatorSprites, x: 0, y: alligatorHeight - 5, width: assets.alligatorSprites.width, height: alligatorHeight},
            {image: assets.alligatorSprites, x: 0, y: 0, width: assets.alligatorSprites.width, height: alligatorHeight}
        ]
    }

    function getFrogs() {
        let frogHeight = assets.frogSprites.height / 8;
        let frogWidth = assets.frogSprites.width / 12;
        let frogSprites = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 3; j++) {
                frogSprites.push({
                    image: assets.frogSprites,
                    x: j * frogWidth,
                    y: i * frogHeight,
                    width: frogWidth,
                    height: frogHeight
                })
            }
        }
        return frogSprites;
    }

    return {
        getShortLog,
        getMediumLog,
        getLongLog,
        getTurtles,
        getTurtlesDiving,
        getRandomCar,
        getFireTruck,
        getSemi,
        getLillyPad,
        getFly,
        getDeath,
        getBush,
        getBushWithLillyPad,
        getAlligator,
        getFrogs
    }

}(MyGame.assets))