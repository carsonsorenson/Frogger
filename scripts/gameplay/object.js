class Object {
    constructor(lane, obj, moveRate, start, laneHeight, width) {
        this.lane = lane;
        this.img = obj;
        this.start = start;
        this.moveRate = moveRate;
        start == 'left' ? this.rotation = 0 : this.rotation = Math.PI;

        this.getSize = function(laneHeight) {
            let scalingFactor = laneHeight / this.img.height;
            return {
                width: this.img.width * scalingFactor,
                height: this.img.height * scalingFactor
            };
        }

        this.getCenter = function(laneHeight, width, newWidth=width) {
            let y = this.lane * laneHeight + (laneHeight / 2);
            let x;
            if (!this._center) {
                if (this.start == 'left') {
                    x = -(this._size.width / 2);
                }
                else {
                    x = width + (this._size.width / 2);
                }
            }
            else {
                x = newWidth * (this._center.x / width);
            }
    
            return {
                x, y
            }
        }

        this.setDimensions = function(laneHeight, width, newWidth=width) {
            this._size = this.getSize(laneHeight);
            this._center = this.getCenter(laneHeight, width, newWidth);
        }
        this.setDimensions(laneHeight, width);

        this.updateObj = function(elapsedTime, width) {
            if (this.start == 'left') {
                this._center.x += (width / this.moveRate) * elapsedTime;
            }
            else {
                this._center.x -= (width / this.moveRate) * elapsedTime;
            }
        }

        this.renderObj = function(drawSprite, center, img) {
            if (center && img) {
                drawSprite(
                    img,
                    center,
                    this._size,
                    this.rotation
                );
            }
            else {
                drawSprite(
                    this.img,
                    this._center,
                    this._size,
                    this.rotation
                );
            }
        }
    }
}