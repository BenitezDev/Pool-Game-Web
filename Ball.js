
function Ball(img, pos, ori) {
    if (!pos) pos = new Vector2();
    this.position = pos;

    if (!ori) ori = new Vector2();
    this.origin = ori;

    this.img = img;
}

Ball.prototype.update = function () {
    // TESTING

    if (input.isKeyPressed(KEY_LEFT))
        this.position.x--;

    if (input.isKeyPressed(KEY_RIGHT))
        this.position.x++;
}


Ball.prototype.draw = function () {
    Canvas.drawImage(this.img, this.position, this.origin);
}