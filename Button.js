


function Button(position, img, width, height, scale, ) {

    if (!position) position = new Vector2();
    this.position = position;

    if (!scale) scale = 1;
    this.scale = scale;

    this.img = img;

    this.width = width;
    this.height = height;

    this.halfWidth = width / 2;
    this.halfHeight = height / 2;

    this.rectangle = {
        position: new Vector2(this.position.x - this.halfWidth, this.position.y - this.halfHeight),
        width: this.width,
        height: this.height
    }

    this.start();

}


Button.prototype.start = function () {
    this.position = new Vector2(this.position.x - this.halfWidth, this.position.y - this.halfHeight);
}


Button.prototype.update = function () {
    if (PointInsideRectangle(input.mouse, this.rectangle) && input.mouse.pressed) {

        console.log("Click on button");
        PoolGame.ChangeSceneTo(scenesTAGs.GAME);
    }

}



Button.prototype.draw = function () {

    Canvas.drawImage(this.img, this.position);



    Canvas._ctx.beginPath();
    Canvas._ctx.lineWidth = "1.5";
    Canvas._ctx.strokeStyle = "green";
    Canvas._ctx.rect(this.rectangle.position.x, this.rectangle.position.y, this.rectangle.width, this.rectangle.height);
    Canvas._ctx.stroke();

}