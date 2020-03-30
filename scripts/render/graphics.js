MyGame.graphics = (function(assets) {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    function clear() {
        ctx.clearRect(
            0, 0, canvas.width, canvas.height
        );
    }

    function drawBackground() {
        drawTexture(
            assets.background,
            {x: ctx.canvas.width / 2, y: ctx.canvas.height / 2},
            {width: ctx.canvas.width, height: ctx.canvas.height},
            0
        )
    }

    function drawLines() {
        ctx.beginPath();
        ctx.strokeStyle = "red";
        let split = ctx.canvas.height / 15;
        for (let i = 1; i < 15; i++) {
            let y = split * i;
            ctx.moveTo(0, y);
            ctx.lineTo(ctx.canvas.width, y);
            ctx.stroke();
        }
    }

    function drawTexture(image, center, size, rotation) {
        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.rotate(rotation);
        ctx.translate(-center.x, -center.y);

        ctx.drawImage(
            image,
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width,
            size.height
        )

    }

    function resize() {
        let width = window.innerWidth * 0.99;
        let height = window.innerHeight * 0.99;
        let ratio = 1.69;

        if (width / height < ratio) {
            canvas.width = width;
            canvas.height = width / ratio;
        }
        else {
            canvas.height = height;
            canvas.width = height * ratio;
        }
    }

    function initalize() {
        window.addEventListener('resize', resize);
        resize();
    }

    return {
        clear,
        drawBackground,
        drawLines,
        initalize
    }

}(MyGame.assets))