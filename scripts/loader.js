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
            scripts: ['menu/main', 'menu/controls', 'menu/credits', 'menu/highScores', 'menu/mainMenu'],
            message: 'Menu loaded'
        },
        {
            scripts: ['objects/sprites', 'objects/input'],
            message: 'Objects loaded',
        },
        {
            scripts: ['render/graphics'],
            message: 'Graphics loaded'
        },
        {
            scripts: ['render/frogLives', 'render/timeBar', 'render/score'],
            message: 'Rendering loaded'
        },
        {
            scripts: ['gameplay/object'],
            message: 'Gameplay base object loaded'
        },
        {
            scripts: ['gameplay/log', 'gameplay/car', 'gameplay/turtle', 'gameplay/frog', 'gameplay/topRow', 'gameplay/gameStatus'],
            message: 'Gameplay objects loaded'
        },
        {
            scripts: ['gameplay/board'],
            message: 'Gameplay board loaded'
        },
        {
            scripts: ['gameplay/main'],
            message: 'Gameplay all loaded'
        }
        /*{
            scripts: ['gameplay/car', 'gameplay/log', 'gameplay/turtle', 
                'gameplay/topRow', 'gameplay/frog', 'gameplay/board','gameplay/main'
            ],
            message: 'Main gameplay loaded'
        }*/
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