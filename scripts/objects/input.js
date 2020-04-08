MyGame.input = (function() {
    function Keyboard() {
        let that = {
            inputBuffer: {}
        };

        function keyPress(e) {
            that.inputBuffer[e.key] = e.key;
        }

        that.update = function(elapsedTime) {
            that.inputBuffer = {};
        }

        window.addEventListener('keydown', keyPress);
    
        return that;
    }
   
    return {
        Keyboard : Keyboard
    };
}());