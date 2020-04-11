MyGame.graphics = (function(assets, objects) {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    function clear() {
        ctx.clearRect(
            0, 0, canvas.width, canvas.height
        );
    }

    function textWidth(font, text) {
        ctx.save();
        ctx.font = font;
        let width = Math.round(ctx.measureText(text).width) + 1;
        ctx.restore();
        return width;
    }

    function drawText(spec) {
        ctx.font = spec.font;
        ctx.fillStyle = spec.fillStyle;
        ctx.textBaseline = 'middle';
        ctx.fillText(spec.text, spec.pos.x, spec.pos.y);
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

        let split2 = ctx.canvas.width / 15;
        for (let i = 1; i < 15; i++) {
            let x = split2 * i;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, ctx.canvas.height);
            ctx.stroke();
        }
    }

    function drawRect(spec) {
        ctx.fillStyle = spec.fillStyle;
        ctx.fillRect(
            spec.center.x - spec.size.width / 2,
            spec.center.y - spec.size.height / 2,
            spec.size.width,
            spec.size.height
        )
    }

    function drawBackground() {
        ctx.drawImage(
            assets.background,
            0, 0,
            ctx.canvas.width, ctx.canvas.height
        )
    }

    function drawDarkBackground() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(
            0, 0, ctx.canvas.width, ctx.canvas.height
        );
    }

    function drawSprite(s, center, size, rotation) {
        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.rotate(rotation);
        ctx.translate(-center.x, -center.y);

        /*
        ctx.strokeStyle = "black";
        ctx.strokeRect(
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width,
            size.height
        )
        */

        ctx.drawImage(
            s.image,
            s.x, s.y,
            s.width, s.height,
            center.x - size.width / 2,
            center.y - size.height / 2,
            size.width,
            size.height
        )
        ctx.restore();
    }

    function resize() {
        let width = window.innerWidth * 0.9;
        let height = window.innerHeight * 0.9;
        let ratio = 1.3;

        if (width / height < ratio) {
            canvas.width = width;
            canvas.height = width / ratio;
        }
        else {
            canvas.height = height;
            canvas.width = height * ratio;
        }
    }

    function initialize() {
        window.addEventListener('resize', resize);
        resize();
    }

    return {
        clear,
        drawBackground,
        drawDarkBackground,
        drawLines,
        initialize,
        drawSprite,
        textWidth,
        drawText,
        drawRect,
        get width() { return canvas.width },
        get height() { return canvas.height }
    }

}(MyGame.assets, MyGame.objects))