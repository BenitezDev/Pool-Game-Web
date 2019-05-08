
function Ball(img, pos, ori, radius) {
    if (!pos) pos = new Vector2();
    this.position = pos;

    if (!ori) ori = new Vector2();
    this.origin = ori;

    this.img = img;

    //this.collider = CreateSphere(7.9, 4.75, radius, { type: b2Body.b2_staticBody });
    //this.collider = CreateBox(Game.prototype.world, 0, 4.8, 0.75, 3.5, { type: b2Body.b2_staticBody });
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