MyGame = {
    screens: {},
    objects: {},
    render: {},
    assets: {},
    objects: {},
    persistence: {},
    keyBindings: {}
}

MyGame.loader = (function() {
    let scriptOrder = [
        {
            scripts: ['persistence'],
            message: 'Persistence loaded'
        },
        {
            scripts: ['menu/main'],
            message: 'menu controller loaded'
        },
        {
            scripts: ['menu/controls', 'menu/credits', 'menu/highScores'],
            message: 'screens loaded'
        },
        {
            scripts: ['menu/mainMenu'],
            message: 'Menu loaded'
        },
        {
            scripts: ['objects/sprites', 'objects/input'],
            message: 'Objects loaded',
        },
        {
            scripts: ['gameplay/random'],
            message: 'Random loaded'
        },
        {
            scripts: ['render/graphics'],
            message: 'Graphics loaded'
        },
        {
            scripts: ['render/frogLives', 'render/timeBar', 'render/score', 'render/gameOver', 'render/pause', 'render/death', 'render/particles'],
            message: 'Rendering loaded'
        },
        {
            scripts: ['gameplay/object'],
            message: 'Gameplay base object loaded'
        },
        {
            scripts: ['gameplay/log', 'gameplay/frog', 'gameplay/car', 'gameplay/alligator', 'gameplay/topRow', 'gameplay/turtle', 'gameplay/gameStatus', 'gameplay/particle'],
            message: 'Gameplay objects loaded'
        },
        {
            scripts: ['gameplay/particleSystem'],
            message: 'Particle System loaded'
        },
        {
            scripts: ['gameplay/board'],
            message: 'Gameplay board loaded'
        },
        {
            scripts: ['gameplay/main'],
            message: 'Gameplay all loaded'
        }
    ];

    let assetOrder = [
        {
            key: 'background',
            source: '/assets/bg.jpg'
        },
        {
            key: 'sprites',
            source: '/assets/gameSprites.png'
        },
        {
            key: 'frogSprites',
            source: '/assets/frogSprites.png'
        },
        {
            key: 'alligatorSprites',
            source: '/assets/alligator.png'
        },
        {
            key: 'slime',
            source: '/assets/slime.png'
        },
        {
            key: 'hopSound',
            source: '/assets/sound-frogger-hop.mp3'
        },
        {
            key: 'squashSound',
            source: '/assets/sound-frogger-squash.mp3'
        },
        {
            key: 'plunkSound',
            source: '/assets/sound-frogger-plunk.mp3'
        },
        {
            key: 'levelUpSound',
            source: '/assets/level_up.mp3'
        },
        {
            key: 'clickSound',
            source: '/assets/click.mp3'
        },
        {
            key: 'backgroundSound',
            source: '/assets/background.mp3'
        },
        {
            key: 'menuSound',
            source: '/assets/menu-music.mp3'
        }
    ];

    function loadScripts(scripts, onComplete) {
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, function() {
                console.log(entry.message);
                scripts.shift();
                loadScripts(scripts, onComplete);
            });
        }
        else {
            onComplete();
        }
    }

    function loadAssets(assets, onSuccess, onError, onComplete) {
        if (assets.length > 0) {
            let entry = assets[0];
            loadAsset(entry.source,
                function(asset) {
                    onSuccess(entry, asset);
                    assets.shift();
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function(error) {
                    onError(error);
                    assets.shift();
                    loadAssets(assets, onSuccess, onError, onComplete);
                }
            )
        }
        else {
            onComplete();
        }
    }

    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        let fileExtension = source.substr(source.lastIndexOf('.') + 1);

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = 'blob';

            xhr.onload = function() {
                let asset = null;
                if (xhr.status === 200) {
                    if (fileExtension == 'png' || fileExtension == 'jpg') {
                        asset = new Image();
                    }
                    else if (fileExtension == 'mp3') {
                        asset = new Audio();
                    }
                    else {
                        if (onError) {
                            onError('Unknown file extension: ' + fileExtension);
                        }
                    }
                    asset.onload = function() {
                        window.URL.revokeObjectURL(asset.src);
                    }
                    asset.src = window.URL.createObjectURL(xhr.response);

                    if (onSuccess) {
                        onSuccess(asset);
                    }
                }
                else {
                    if (onError) {
                        onError('Failed to retrieve: ' + source);
                    }
                }
            }
        }
        else {
            if (onError) {
                onError('Unknown file extension: ' + fileExtension);
            }
        }

        xhr.send();
    }

    function mainComplete() {
        console.log('All loaded');
        MyGame.game.initialize();
    }

    console.log('Starting to load project assets');
    loadAssets(
        assetOrder,
        function(source, asset) {
            MyGame.assets[source.key] = asset;
        },
        function(error) {
            console.log(error);
        },
        function() {
            console.log('All Game assets loaded');
            console.log('Starting to load scripts');
            loadScripts(scriptOrder, mainComplete);
        }
    )
}());